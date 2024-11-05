import { OrcaRouter } from '../utils/orcaRouter';
import { SwapParams, Route } from '../types/router';
import { logger } from '../utils/logger';
import { metrics } from '../utils/metrics';
import { CONFIG } from '../config/config';
import { Connection, PublicKey } from '@solana/web3.js';
import { retry } from '@lifeomic/attempt';

export class RouterService {
  private router: OrcaRouter;
  private initialized: boolean = false;

  constructor() {
    const connection = new Connection(CONFIG.RPC_URL, 'confirmed');
    this.router = new OrcaRouter(connection);
  }

  async initialize() {
    if (this.initialized) return;

    try {
      await this.router.initialize();
      this.initialized = true;
      logger.info('Router service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize router service', { error });
      throw error;
    }
  }

  async findRoutes(params: SwapParams): Promise<Route[]> {
    const timer = metrics.routeSearchTime.startTimer();
    
    try {
      const routes = await retry(
        async () => {
          return await this.router.findBestRoute(params);
        },
        {
          maxAttempts: CONFIG.MAX_RETRIES,
          delay: CONFIG.RETRY_DELAY,
          handleError: (error, context) => {
            logger.warn('Route finding attempt failed', {
              attempt: context.attemptNum,
              error,
            });
          },
        }
      );

      // Filter routes with excessive price impact
      const filteredRoutes = routes.filter(
        route => route.totalPriceImpact.toNumber() <= CONFIG.MAX_PRICE_IMPACT
      );

      timer();
      return filteredRoutes;
    } catch (error) {
      timer();
      logger.error('Failed to find routes', { error, params });
      throw error;
    }
  }

  async buildSwapTransaction(route: Route, wallet: PublicKey) {
    const timer = metrics.swapExecutionTime.startTimer();
    
    try {
      const transaction = await this.router.buildSwapTransaction(route, wallet);
      timer();
      return transaction;
    } catch (error) {
      timer();
      metrics.failedSwaps.inc();
      logger.error('Failed to build swap transaction', { error, route });
      throw error;
    }
  }
}

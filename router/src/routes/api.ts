import { Router } from 'express';
import { RouterService } from '../services/routerService';
import { SwapParams } from '../types/router';
import { logger } from '../utils/logger';
import { PublicKey } from '@solana/web3.js';
import Decimal from 'decimal.js';
import { CONFIG } from '@/config/config';

const router = Router();
const routerService = new RouterService();

router.post('/quote', async (req, res, next) => {
  try {
    const {
      tokenIn,
      tokenOut,
      amountIn,
      slippageTolerance = CONFIG.DEFAULT_SLIPPAGE,
      maxHops = 3,
    } = req.body;

    const params: SwapParams = {
      tokenIn: new PublicKey(tokenIn),
      tokenOut: new PublicKey(tokenOut),
      amountIn: new Decimal(amountIn),
      slippageTolerance: new Decimal(slippageTolerance),
      maxHops,
    };

    const routes = await routerService.findRoutes(params);
    res.json({ routes });
  } catch (error) {
    next(error);
  }
});

router.post('/swap', async (req, res, next) => {
  try {
    const { route, wallet } = req.body;
    
    const transaction = await routerService.buildSwapTransaction(
      route,
      new PublicKey(wallet)
    );
    
    res.json({ transaction });
  } catch (error) {
    next(error);
  }
});

export default router;

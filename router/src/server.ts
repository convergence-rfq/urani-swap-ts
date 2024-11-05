import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { CONFIG } from './config/config';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import apiRoutes from './routes/api';
import { RouterService } from './services/routerService';
import { logger } from './utils/logger';

async function startServer() {
  const app = express();
  
  // Initialize router service
  const routerService = new RouterService();
  await routerService.initialize();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  app.use(rateLimiter);

  // Routes
  app.use('/api', apiRoutes);

  // Error handling
  app.use(errorHandler);

  // Start server
  app.listen(CONFIG.PORT, () => {
    logger.info(`Server started on port ${CONFIG.PORT}`);
  });
}

startServer().catch((error) => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});

import rateLimit from 'express-rate-limit';
import { CONFIG } from '../config/config';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: CONFIG.MAX_CONCURRENT_REQUESTS,
  message: 'Too many requests from this IP, please try again later.',
});

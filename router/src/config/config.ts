export const CONFIG = {
  RPC_URL: process.env.RPC_URL || 'https://api.mainnet-beta.solana.com',
  PORT: process.env.PORT || 3000,
  CACHE_DURATION: 30000, // 30 seconds
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  MAX_CONCURRENT_REQUESTS: 50,
  DEFAULT_SLIPPAGE: 0.01,
  MAX_PRICE_IMPACT: 5, // 5%
  MONITORING: {
    ENABLE_METRICS: true,
    PROMETHEUS_PORT: 9090,
  },
};
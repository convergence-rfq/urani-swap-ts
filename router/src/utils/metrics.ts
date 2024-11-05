import client from 'prom-client';

const register = new client.Registry();

export const metrics = {
  routeSearchTime: new client.Histogram({
    name: 'route_search_time_seconds',
    help: 'Time taken to find routes',
    buckets: [0.1, 0.5, 1, 2, 5],
  }),
  
  swapExecutionTime: new client.Histogram({
    name: 'swap_execution_time_seconds',
    help: 'Time taken to execute swaps',
    buckets: [1, 2, 5, 10, 30],
  }),

  failedSwaps: new client.Counter({
    name: 'failed_swaps_total',
    help: 'Number of failed swaps',
  }),

  poolCacheHits: new client.Counter({
    name: 'pool_cache_hits_total',
    help: 'Number of pool cache hits',
  }),
};

register.setDefaultLabels({
  app: 'orca-router',
});

client.collectDefaultMetrics({ register });

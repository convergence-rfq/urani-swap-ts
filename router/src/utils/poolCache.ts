import { WhirlpoolData } from "@orca-so/whirlpools-sdk";
import { PoolCache } from "../types/router";
import { PublicKey } from "@solana/web3.js";

export class PoolCacheManager {
  private pools: Map<string, PoolCache> = new Map();
  private CACHE_DURATION = 30000; // 30 seconds

  addPool(pool: WhirlpoolData): void {
    const key = pool.address.toString();
    this.pools.set(key, {
      pool,
      lastUpdated: Date.now(),
      liquidity: pool.liquidity,
    });
  }

  getPool(address: PublicKey): PoolCache | undefined {
    const cached = this.pools.get(address.toString());
    if (!cached) return undefined;
    
    if (Date.now() - cached.lastUpdated > this.CACHE_DURATION) {
      this.pools.delete(address.toString());
      return undefined;
    }
    
    return cached;
  }

  getPools(): PoolCache[] {
    return Array.from(this.pools.values()).filter(
      (cache) => Date.now() - cache.lastUpdated <= this.CACHE_DURATION
    );
  }
}

import { WhirlpoolData, PoolUtil } from "@orca-so/whirlpools-sdk";
import { PublicKey } from "@solana/web3.js";
import { Route, RouteHop, SwapParams } from "../types/router";
import Decimal from "decimal.js";
import { PoolCacheManager } from "./poolCache";

export class RouteBuilder {
  private poolCache: PoolCacheManager;

  constructor(poolCache: PoolCacheManager) {
    this.poolCache = poolCache;
  }

  async findAllRoutes(params: SwapParams): Promise<Route[]> {
    const routes: Route[] = [];
    const maxHops = params.maxHops || 3;
    const visited = new Set<string>();

    const findRoutes = (
      currentToken: PublicKey,
      targetToken: PublicKey,
      currentPath: RouteHop[],
      remainingAmount: Decimal
    ) => {
      if (currentPath.length >= maxHops) return;
      
      const pools = this.poolCache.getPools();
      
      for (const { pool } of pools) {
        if (visited.has(pool.address.toString())) continue;

        const tokenA = pool.tokenMintA;
        const tokenB = pool.tokenMintB;

        if (!this.isValidPool(pool, currentToken, targetToken)) continue;

        visited.add(pool.address.toString());
        
        const nextToken = tokenA.equals(currentToken) ? tokenB : tokenA;
        const hop = this.calculateHop(pool, currentToken, nextToken, remainingAmount);
        
        if (hop) {
          currentPath.push(hop);
          
          if (nextToken.equals(targetToken)) {
            routes.push(this.buildRoute([...currentPath]));
          } else {
            findRoutes(nextToken, targetToken, currentPath, hop.quotedAmountOut);
          }
          
          currentPath.pop();
        }
        
        visited.delete(pool.address.toString());
      }
    };

    findRoutes(params.tokenIn, params.tokenOut, [], params.amountIn);

    return this.selectBestRoutes(routes, params.maxRoutes || 3);
  }

  private isValidPool(
    pool: WhirlpoolData,
    tokenIn: PublicKey,
    tokenOut: PublicKey
  ): boolean {
    return (
      (pool.tokenMintA.equals(tokenIn) || pool.tokenMintB.equals(tokenIn)) &&
      (pool.tokenMintA.equals(tokenOut) || pool.tokenMintB.equals(tokenOut))
    );
  }

  private calculateHop(
    pool: WhirlpoolData,
    tokenIn: PublicKey,
    tokenOut: PublicKey,
    amountIn: Decimal
  ): RouteHop | null {
    try {
      const isAtoB = pool.tokenMintA.equals(tokenIn);
      const quote = PoolUtil.getSwapQuote({
        whirlpool: pool,
        amountIn,
        amountSpecifiedIsInput: true,
        aToB: isAtoB,
      });

      const priceImpact = this.calculatePriceImpact(pool, amountIn, quote.estimatedAmountOut);

      return {
        pool,
        tokenIn,
        tokenOut,
        quotedAmountIn: amountIn,
        quotedAmountOut: quote.estimatedAmountOut,
        fee: quote.estimatedFee,
        priceImpact,
      };
    } catch (error) {
      console.error("Error calculating hop:", error);
      return null;
    }
  }

  private calculatePriceImpact(
    pool: WhirlpoolData,
    amountIn: Decimal,
    amountOut: Decimal
  ): Decimal {
    // Simplified price impact calculation
    const poolLiquidity = new Decimal(pool.liquidity.toString());
    return amountIn.div(poolLiquidity).mul(100);
  }

  private buildRoute(hops: RouteHop[]): Route {
    const totalAmountOut = hops[hops.length - 1].quotedAmountOut;
    const totalPriceImpact = hops.reduce(
      (sum, hop) => sum.add(hop.priceImpact),
      new Decimal(0)
    );
    const totalFees = hops.reduce(
      (sum, hop) => sum.add(hop.fee),
      new Decimal(0)
    );

    return {
      hops,
      totalAmountOut,
      totalPriceImpact,
      totalFees,
    };
  }

  private selectBestRoutes(routes: Route[], maxRoutes: number): Route[] {
    return routes
      .sort((a, b) => b.totalAmountOut.minus(a.totalAmountOut).toNumber())
      .slice(0, maxRoutes);
  }
}

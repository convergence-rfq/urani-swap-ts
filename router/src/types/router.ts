import { PublicKey } from "@solana/web3.js";
import { WhirlpoolData } from "@orca-so/whirlpools-sdk";
import Decimal from "decimal.js";

export interface RouteHop {
  pool: WhirlpoolData;
  tokenIn: PublicKey;
  tokenOut: PublicKey;
  quotedAmountIn: Decimal;
  quotedAmountOut: Decimal;
  fee: Decimal;
  priceImpact: Decimal;
}

export interface Route {
  hops: RouteHop[];
  totalAmountOut: Decimal;
  totalPriceImpact: Decimal;
  totalFees: Decimal;
}

export interface SwapParams {
  tokenIn: PublicKey;
  tokenOut: PublicKey;
  amountIn: Decimal;
  slippageTolerance: Decimal;
  maxHops?: number;
  maxRoutes?: number;
}

export interface PoolCache {
  pool: WhirlpoolData;
  lastUpdated: number;
  liquidity: Decimal;
}

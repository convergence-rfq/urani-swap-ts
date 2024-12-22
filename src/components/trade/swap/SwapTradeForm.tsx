"use client";

import { Line, XAxis, YAxis, Tooltip } from "recharts";
import { useCallback, useEffect, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Token } from "@/lib/interfaces/tokensList";
import { useSwap } from "./SwapProvider";
import AdditionalInfo from "./AdditionalInfo";
import SubmitButton from "./SubmitButton";
import TradeSelectors from "../TradeSelectors";
import TransactionMessage from "@/components/utils/TransactionMessage";
import Toast from '@/components/utils/Toast';
import useConvergenceQuotes from "@/hooks/useConvergenceQuotes";
import { sanitizeInput, validateAmount } from "@/lib/utils/validation";

interface MarketInfo {
  id: string;
  label: string;
  amountIn: number;
  amountOut: number;
  lpFee: { amount: number; mint: string; };
  platformFee: { amount: number; mint: string; };
  priceImpact: number;
}

interface RouteInfo {
  amountIn: number;
  amountOut: number;
  priceImpact: number;
  marketInfos: MarketInfo[];
}

// ... rest of the code



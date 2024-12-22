"use client";

import type { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import { sanitizeAddress, sanitizeInput, validateAmount } from "@/lib/utils/validation";
import { useCallback, useState } from "react";

interface ConvergenceQuoteResponse {
  quote: string;
  outputAmount: string;
  expectedPrice: number;
  priceImpact: number;
  totalFee: number;
  routes: RouteInfo[];
}

interface RouteInfo {
  amountIn: number;
  amountOut: number;
  priceImpact: number;
  marketInfos: MarketInfo[];
}

interface MarketInfo {
  id: string;
  label: string;
  amountIn: number;
  amountOut: number;
  lpFee: { amount: number; mint: string; };
  platformFee: { amount: number; mint: string; };
  priceImpact: number;
}

interface SwapParams {
  quote: string;
  userPublicKey: string;
  wrapUnwrapSOL?: boolean;
}

export default function useConvergenceQuotes(
  setErrorMessage: (message: string) => void,
  setOrderStatus: (status: string) => void,
  sellSelectedToken: Token | TokenWithBalance | null,
  buySelectedToken: Token | TokenWithBalance | null,
  sellAmount: number,
  setBuyAmount: (amount: string) => void,
  setBuyTokenBalance: (balance: string) => void
) {
  const [quote, setQuote] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<ConvergenceQuoteResponse | null>(null);

  const getQuote = useCallback(async () => {
    if (!sellSelectedToken?.address || !buySelectedToken?.address) return;
    
    const sanitizedAmount = sanitizeInput(sellAmount.toString());
    if (!validateAmount(sanitizedAmount)) {
      throw new Error("Invalid amount");
    }

    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        inputMint: sanitizeAddress(sellSelectedToken.address),
        outputMint: sanitizeAddress(buySelectedToken.address),
        amount: sanitizedAmount,
        slippage: "0.5"
      });

      const response = await fetch(
        `https://api.trade.convergence.so/router/quote?${params.toString()}`,
        { method: "GET" }
      );

      const data: ConvergenceQuoteResponse = await response.json();
      if (data.error) throw new Error(data.error);

      setBuyAmount(data.outputAmount);

      if (data.routes?.[0]) {
        setBuyTokenBalance(data.routes[0].amountOut.toString());
      }

      setQuote(data.quote);
      setQuoteData(data);
      setOrderStatus("INCOMPLETE");

      return {
        quote: data.quote,
        outputAmount: data.outputAmount,
        routes: data.routes
      };

    } catch (error) {
      console.error("Error fetching quote:", error);
      setErrorMessage((error as Error).message || "Failed to get quote");
      setOrderStatus("ERROR");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [
    sellSelectedToken?.address,
    buySelectedToken?.address,
    sellAmount,
    setBuyAmount,
    setBuyTokenBalance,
    setErrorMessage,
    setOrderStatus
  ]);

  const prepareSwapParams = (publicKey: string): SwapParams => {
    if (!quoteData?.quote) throw new Error("No quote available");
    
    return {
      quote: quoteData.quote,
      userPublicKey: publicKey,
      wrapUnwrapSOL: true
    };
  };

  return { 
    quote, 
    quoteData, 
    isLoading, 
    getQuote,
    prepareSwapParams 
  };
} 
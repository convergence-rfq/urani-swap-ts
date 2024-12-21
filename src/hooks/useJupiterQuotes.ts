import { useCallback, useEffect, useState } from "react";
import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";

interface ConvergenceQuote {
  quote: string;
  outputAmount: string;
  expectedPrice: number;
  priceImpact: number;
  totalFee: number;
}

export default function useConvergenceQuotes(
  setErrorMessage: (message: string) => void,
  setOrderStatus: (status: string) => void,
  sellSelectedToken: Token | TokenWithBalance | null,
  buySelectedToken: Token | TokenWithBalance | null,
  amount: number,
) {
  const [quote, setQuote] = useState<string>('');
  const [outputAmount, setOutputAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const getQuote = useCallback(async () => {
    if (!sellSelectedToken?.address || !buySelectedToken?.address || !amount || amount <= 0) {
      setQuote('');
      setOutputAmount('');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('https://api.trade.convergence.so/router/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenX: sellSelectedToken.address,
          tokenY: buySelectedToken.address,
          amountIn: amount.toString(),
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setQuote(data.quote);
      setOutputAmount(data.outputAmount);
      setOrderStatus("INCOMPLETE");
    } catch (error) {
      console.error('Error fetching quote:', error);
      setErrorMessage((error as Error).message || "Failed to get quote");
      setOrderStatus("ERROR");
    } finally {
      setIsLoading(false);
    }
  }, [sellSelectedToken?.address, buySelectedToken?.address, amount, setErrorMessage, setOrderStatus]);

  return { quote, outputAmount, isLoading, getQuote };
}

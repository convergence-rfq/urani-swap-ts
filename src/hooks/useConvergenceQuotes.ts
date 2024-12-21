import { useCallback, useState, useEffect } from 'react';
import { Token, TokenWithBalance } from '@/lib/interfaces/tokensList';

interface ConvergenceQuoteResponse {
  quote: string;
  outputAmount: string;
  expectedPrice: number;
  priceImpact: number;
  totalFee: number;
  error?: string;
  routes: Array<{
    amountIn: number;
    amountOut: number;
    priceImpact: number;
    marketInfos: Array<{
      id: string;
      label: string;
      amountIn: number;
      amountOut: number;
      lpFee: { amount: number; mint: string; };
      platformFee: { amount: number; mint: string; };
      priceImpact: number;
    }>;
  }>;
}

// Convergence API for trading functionality
const CONVERGENCE_API = "https://api.trade.convergence.so";

export function useConvergenceQuotes() {
  const [tokens, setTokens] = useState<ConvergenceToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        // Use Eclipse API endpoint
        const response = await fetch('https://api.trade.convergence.so/tokens');
        const data: ConvergenceTokensResponse = await response.json();
        
        if (Array.isArray(data.data)) {
          setTokens(data.data);
        } else {
          console.error('Unexpected tokens format:', data);
          setTokens([]);
        }
      } catch (err) {
        setError('Failed to fetch tokens');
        console.error('Error fetching tokens:', err);
        setTokens([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return { tokens, isLoading, error };
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
  const [quoteData, setQuoteData] = useState<ConvergenceQuoteResponse | null>(null);

  const getQuote = useCallback(async () => {
    if (!sellSelectedToken?.address || !buySelectedToken?.address || !amount || amount <= 0) {
      setQuote('');
      setOutputAmount('');
      return;
    }

    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        inputMint: sellSelectedToken.address,
        outputMint: buySelectedToken.address,
        amount: amount.toString(),
        slippage: '0.5',
        feeBps: '0'
      });

      const response = await fetch(
        `${CONVERGENCE_API}/router/quote?${params.toString()}`,
        { method: 'GET' }
      );

      const data: ConvergenceQuoteResponse = await response.json();
      if (data.error) throw new Error(data.error);

      setQuote(data.quote);
      setOutputAmount(data.outputAmount);
      setQuoteData(data);
      setOrderStatus("INCOMPLETE");
    } catch (error) {
      console.error('Error fetching quote:', error);
      setErrorMessage((error as Error).message || "Failed to get quote");
      setOrderStatus("ERROR");
    } finally {
      setIsLoading(false);
    }
  }, [sellSelectedToken?.address, buySelectedToken?.address, amount, setErrorMessage, setOrderStatus]);

  return { quote, outputAmount, isLoading, getQuote, quoteData };
} 
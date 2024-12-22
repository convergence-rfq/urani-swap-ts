import { useEffect, useState } from 'react';

interface ConvergenceToken {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  freeze_authority: string | null;
  mint_authority: string | null;
  update_authority: string | null;
  created_at: string;
  updated_at: string;
}

interface ConvergenceTokensResponse {
  totalCount: number;
  data: ConvergenceToken[];
}

const CONVERGENCE_API = "https://api.trade.convergence.so";

export function useConvergenceTokens() {
  const [tokens, setTokens] = useState<ConvergenceToken[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${CONVERGENCE_API}/tokens?isPaging=false&pageNumber=0&pageSize=10&sortDirection=ASC`
        );
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
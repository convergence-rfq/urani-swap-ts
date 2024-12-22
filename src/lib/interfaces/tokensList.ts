import { tokenPriceFeedIds } from "../tokenPriceFeedIds";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI?: string;
  freeze_authority?: string | null;
  mint_authority?: string | null;
  update_authority?: string | null;
  created_at: string;
  updated_at: string;
}

export interface TokenWithBalance extends Token {
  balance: number | null | undefined;
}

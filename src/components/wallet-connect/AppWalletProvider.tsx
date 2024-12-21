"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { Connection, Commitment } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

// Use environment variables
const HELIUS_RPC = {
  http: process.env.NEXT_PUBLIC_HELIUS_RPC_URL!,
  ws: process.env.NEXT_PUBLIC_HELIUS_RPC_WS!,
  network: WalletAdapterNetwork.Devnet
};

require('@solana/wallet-adapter-react-ui/styles.css');

export default function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const connectionConfig = {
    commitment: 'confirmed' as Commitment,
    wsEndpoint: HELIUS_RPC.ws,
    disableRetryOnRateLimit: true
  };

  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={HELIUS_RPC.http} config={connectionConfig}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

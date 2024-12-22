"use client";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { useMemo } from "react";
import { Commitment } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";

require('@solana/wallet-adapter-react-ui/styles.css');

const HELIUS_RPC = {
  http: process.env.NEXT_PUBLIC_HELIUS_RPC_URL || "https://api.devnet.solana.com",
  ws: process.env.NEXT_PUBLIC_HELIUS_RPC_WS || "wss://api.devnet.solana.com",
  network: WalletAdapterNetwork.Devnet
};

export default function AppWalletProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  const connectionConfig = {
    commitment: 'confirmed' as Commitment,
    wsEndpoint: HELIUS_RPC.ws,
    disableRetryOnRateLimit: true
  };

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

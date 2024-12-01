"use server";

import { EnvProvider } from "@/components/layout/EnvProvider";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { SwapProvider } from "@/components/trade/swap/SwapProvider";
import SwapWidget from "@/components/layout/SwapWidget";

async function fetchEnvVars() {
  return {
    heliusApiKey: process.env.HELIUS_API_KEY,
    protocolProgramIdPubkey: process.env.PROTOCOL_PROGRAM_ID_PUBLIC_KEY,
    nonceAuthorityAccountSecretKey:
      process.env.NONCE_AUTHORITY_ACCOUNT_SECRET_KEY,
    nonceAuthorityAccountPubkey: process.env.NONCE_AUTHORITY_ACCOUNT_PUBLIC_KEY,
    nonceAccountPubkey: process.env.NONCE_ACCOUNT_PUBLIC_KEY,
    nonceAccountSecretKey: process.env.NONCE_ACCOUNT_SECRET_KEY,
  };
}

export default async function Home() {
  const env = await fetchEnvVars();

  return (
    <div className="flex flex-col justify-between min-h-screen aaa bg-[#1c2936] space-y-4">
      <Header />
      <main className="flex items-center justify-center">
        <div className="flex flex-1 flex-col items-center justify-center px-4 lg:pt-16 w-full sm:max-w-lg lg:max-w-7xl">
          <EnvProvider env={env}>
            <SwapProvider>
              <SwapWidget />
            </SwapProvider>
          </EnvProvider>
        </div>
      </main>
      <Footer />
    </div>
  );
}

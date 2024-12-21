"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

const baseClasses = `
  rounded-xl 
  bg-v2-text-gradient 
  bg-clip-text 
  text-transparent 
  group-disabled:bg-none 
  group-disabled:text-[#CFF3FF] 
  group-disabled:text-opacity-25 
  p-[calc(2rem-1px)] 
  py-3 
  text-sm 
  font-semibold 
  leading-none 
  min-h-[56px] 
  min-w-[200px] 
  flex 
  items-center 
  justify-center
  wallet-connect-button
`;

export default function WalletConnectionButton() {
  const { connected } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <WalletMultiButton 
      className={baseClasses}
      style={{
        background: 'transparent',
        height: 'auto',
        minHeight: '56px',
        minWidth: '200px',
        border: 'none',
      }}
    />
  );
}

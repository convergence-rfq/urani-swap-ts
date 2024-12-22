"use client";

import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";

interface TokenSelectorButtonProps {
  token: Token | TokenWithBalance | null;
  onClick: () => void;
  label?: string;
}

export default function TokenSelectorButton({ token, onClick, label }: TokenSelectorButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#131b24] hover:bg-[#1c2936] transition-colors"
    >
      {token ? (
        <>
          <img
            src={token.logoURI}
            alt={token.symbol}
            className="w-6 h-6 rounded-full"
          />
          <span className="font-medium">{token.symbol}</span>
        </>
      ) : (
        <span className="text-gray-400">Select Token</span>
      )}
      <span className="material-symbols-rounded text-gray-400">expand_more</span>
    </button>
  );
}

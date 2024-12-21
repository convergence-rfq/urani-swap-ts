import { Modal } from '@mantine/core';
import { useConvergenceTokens } from '@/hooks/useConvergenceTokens';
import { Token } from '@/lib/interfaces/tokensList';
import Image from 'next/image';
import { useState } from 'react';

interface TokenListModalProps {
  opened: boolean;
  close: () => void;
  setSelectedToken: (token: Token) => void;
}

function TokenIcon({ token }: { token: Token }) {
  if (!token.logoURI) {
    return (
      <div className="w-6 h-6 rounded-full bg-[#202629] flex items-center justify-center">
        <span className="text-white/50 text-xs">{token.symbol.slice(0, 2)}</span>
      </div>
    );
  }

  return (
    <div className="w-6 h-6 rounded-full bg-[#202629] flex items-center justify-center">
      <Image 
        src={token.logoURI}
        alt={token.symbol}
        width={24}
        height={24}
        className="rounded-full"
        onError={(e) => {
          // On error, show fallback with symbol initials
          const target = e.target as HTMLElement;
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<span class="text-white/50 text-xs">${token.symbol.slice(0, 2)}</span>`;
          }
        }}
      />
    </div>
  );
}

export default function TokenListModal({ opened, close, setSelectedToken }: TokenListModalProps) {
  const { tokens, isLoading } = useConvergenceTokens();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Select a token"
      radius="lg"
      classNames={{
        content: "bg-[#313e4c] text-white token_select_modal",
        header: "bg-[#313e4c] sticky text-white token_select_modal_header",
        title: "font-bold text-xl text-white",
      }}
    >
      <input
        type="text"
        placeholder="Search name or paste address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 bg-[#1c2936] border border-[#202629] rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#c7f284]"
      />
      
      <div className="max-h-[400px] overflow-y-auto">
        {isLoading ? (
          <div className="text-white/50 text-center py-4">Loading tokens...</div>
        ) : (
          <div className="space-y-1">
            {filteredTokens.map((token) => (
              <button
                key={token.address}
                onClick={() => {
                  setSelectedToken(token);
                  close();
                }}
                className="w-full flex items-center p-2 hover:bg-[#435467] rounded transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TokenIcon token={token} />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white">{token.symbol}</span>
                    <span className="text-xs text-white/50">{token.name}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
}

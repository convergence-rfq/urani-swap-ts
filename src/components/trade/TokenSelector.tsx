"use client";

import { NumberInput } from "@mantine/core";
import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import { useConvergenceTokens } from '@/hooks/useConvergenceTokens';
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import TokenListModal from "./token-list-modal/TokenListModal";
import TokenSelectorButton from "./TokenSelectorButton";

interface TokenSelectorProps {
  inputValue: string | number;
  setInputValue: (value: string | number) => void;
  selectedToken: (Token | TokenWithBalance) | null;
  setSelectedToken: (token: (Token | TokenWithBalance) | null) => void;
  tokenToUSDPrice?: number | null;
  label?: string;
  typeSelected: string;
  getTokenBalance?: (token: Token | TokenWithBalance) => Promise<number>;
  wallet: { connected: boolean };
  isSell?: boolean;
  otherToken?: Token | TokenWithBalance | null;
  setOtherToken?: (token: Token | TokenWithBalance | null) => void;
}

export default function TokenSelector({
  inputValue,
  setInputValue,
  selectedToken,
  setSelectedToken,
  tokenToUSDPrice,
  label,
  getTokenBalance,
  wallet,
  isSell = false,
  otherToken,
  setOtherToken,
}: TokenSelectorProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const { tokens } = useConvergenceTokens();

  const convertedToUSD = tokenToUSDPrice && inputValue 
    ? (Number(inputValue) * tokenToUSDPrice).toFixed(2)
    : null;

  const hasBalance = (token: Token | TokenWithBalance): token is TokenWithBalance => {
    return 'balance' in token;
  };

  useEffect(() => {
    if (selectedToken && getTokenBalance && wallet?.connected && !hasBalance(selectedToken)) {
      const updateBalance = async () => {
        try {
          const balance = await getTokenBalance(selectedToken);
          setSelectedToken({
            ...selectedToken,
            balance
          });
        } catch (error) {
          console.error("Error updating balance:", error);
        }
      };
      updateBalance();
    }
  }, [selectedToken, getTokenBalance, wallet?.connected, setSelectedToken]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm text-gray-400">{label}</label>
        {convertedToUSD && (
          <span className="text-sm text-gray-400">≈ ${convertedToUSD}</span>
        )}
      </div>
      
      <div className="flex gap-2">
        <NumberInput
          value={inputValue}
          onChange={(val) => setInputValue(val)}
          placeholder="0.00"
          className="flex-1"
        />
        <TokenSelectorButton
          token={selectedToken}
          onClick={open}
          label={label}
        />
      </div>

      <TokenListModal
        opened={opened}
        close={close}
        onSelect={(token) => {
          if (otherToken && token.address === otherToken.address) {
            setSelectedToken(otherToken);
            setOtherToken?.(selectedToken);
          } else {
            setSelectedToken(token);
          }
        }}
        tokens={tokens}
      />
    </div>
  );
}

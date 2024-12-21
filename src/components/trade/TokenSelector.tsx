import { NumberInput } from "@mantine/core";
import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import TokenListModal from "./token-list-modal/TokenListModal";
import TokenSelectorButton from "./TokenSelectorButton";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { useConvergenceTokens } from '@/hooks/useConvergenceTokens';

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
  const convertedToUSD =
    tokenToUSDPrice &&
    inputValue &&
    (Number(inputValue || 0) * tokenToUSDPrice).toFixed(2);

  // Add type guard
  const hasBalance = (token: Token | TokenWithBalance): token is TokenWithBalance => {
    return 'balance' in token;
  };

  const handleHalf = () => {
    if (selectedToken && hasBalance(selectedToken) && selectedToken.balance) {
      const halfAmount = Number(selectedToken.balance) / 2;
      setInputValue(halfAmount.toString());
    }
  };

  const handleMax = () => {
    if (selectedToken && hasBalance(selectedToken) && selectedToken.balance) {
      setInputValue(selectedToken.balance.toString());
    }
  };

  const formatBalance = (balance: number | null | undefined) => {
    if (!balance) return '0.00';
    return Number(balance).toFixed(6);
  };

  useEffect(() => {
    const updateBalance = async () => {
      if (selectedToken && getTokenBalance && wallet?.connected && !hasBalance(selectedToken)) {
        try {
          const balance = await getTokenBalance(selectedToken);
          console.log("Token balance:", balance);
          
          const tokenWithBalance: TokenWithBalance = {
            ...selectedToken,
            balance: balance
          };
          
          setSelectedToken(tokenWithBalance);
        } catch (error) {
          console.error("Error updating balance:", error);
        }
      }
    };

    if (selectedToken?.address && wallet?.connected && !hasBalance(selectedToken)) {
      updateBalance();
    }
  }, [selectedToken?.address, getTokenBalance, wallet?.connected]);

  const handleTokenSelect = (token: Token | TokenWithBalance | null) => {
    if (otherToken && token?.address === otherToken.address) {
      setSelectedToken(otherToken);
      setOtherToken(selectedToken);
    } else {
      setSelectedToken(token);
    }
  };

  const { tokens, isLoading: tokensLoading } = useConvergenceTokens();

  return (
    <>
      <div className="relative flex min-h-[124px] flex-col space-y-3 rounded-xl border border-transparent p-4 focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark bg-[#131b24]">
        <NumberInput
          label={
            <>
              <div className="flex justify-between w-full items-center">
                {label}
                <div className="flex items-center gap-2 ic-text-color">
                  <span className="flex gap-1 text-[13px] cursor-pointer items-center space-x-1 rounded text-white/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/50"
                    >
                      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
                      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
                    </svg>
                    <span className="ml-1">
                      {selectedToken && hasBalance(selectedToken) ? formatBalance(selectedToken.balance) : '0.00'} {selectedToken?.symbol}
                    </span>
                  </span>
                  {isSell && (
                    <>
                      <button 
                        onClick={handleHalf}
                        className="px-3 py-1 text-[13px] rounded-[6px] bg-[#1c2936] text-white/75 hover:bg-[#243242] active:bg-[#2d3e4f] transition-colors cursor-pointer"
                      >
                        HALF
                      </button>
                      <button
                        onClick={handleMax}
                        className="px-3 py-1 text-[13px] rounded-[6px] bg-[#1c2936] text-white/75 hover:bg-[#243242] active:bg-[#2d3e4f] transition-colors cursor-pointer"
                      >
                        MAX
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          }
          aria-label="Enter Amount"
          variant="unstyled"
          clampBehavior="strict"
          allowNegative={false}
          leftSection={
            <TokenSelectorButton onClick={open} token={selectedToken} />
          }
          hideControls
          size="xl"
          value={inputValue}
          onChange={setInputValue}
          placeholder="0.00"
          classNames={{
            label: "ml-1 text-sm font-bold text-white w-full",
            section: "ml-1 w-auto",
            input:
              "h-full w-full border-none bg-transparent focus:ring-0 text-right placeholder:text-white/25 disabled:cursor-not-allowed disabled:text-black disabled:opacity-100 text-xl outline-none disabled:!text-white font-semibold text-[#e8f9ff] p-0",
          }}
          error={!selectedToken && "Please select a token"}
        />
        {convertedToUSD ? (
          <div className="text-xs text-[#e8f9ff80] text-right mr-3 mb-3">
            ≈ $ {convertedToUSD || 0}
          </div>
        ) : null}
        <TokenListModal
          opened={opened}
          open={open}
          close={close}
          setSelectedToken={handleTokenSelect}
          excludeToken={otherToken}
        />
      </div>
    </>
  );
}

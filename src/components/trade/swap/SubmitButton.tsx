import { UnifiedWalletButton, useUnifiedWallet } from "@jup-ag/wallet-adapter";

import { Button } from "@/components/ui/button";
import { Token } from "@/lib/interfaces/tokensList";
import { useBalance } from "@/hooks/useBalance";
import { useMemo } from "react";

interface SubmitButtonProps {
  sellAmount: string | number;
  sellToken: Token | null;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function SubmitButton({
  sellAmount,
  sellToken,
  onSubmit,
  isLoading,
}: SubmitButtonProps) {
  const { connected } = useUnifiedWallet();
  const balance = useBalance(sellToken);

  const insufficientBalance = useMemo(() => {
    if (!sellAmount || !balance) return false;

    return Number(sellAmount) > balance;
  }, [sellAmount, balance]);

  const buttonJsx = useMemo(() => {
    if (!connected)
      return (
        <UnifiedWalletButton
          buttonClassName="w-full rounded-xl px-4 py-5 text-lg h-auto bg-[#c7f2821a] text-[#c7f284] shadow-md wallet-connect-button"
          currentUserClassName="rounded-xl bg-[#c7f2821a] bg-clip-text text-[#c7f284] group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 py-5 text-lg font-medium leading-none wallet-connect-button"
        />
      );
    if (connected && !sellAmount)
      return (
        <Button variant="secondary" className="w-full" disabled>
          Enter an amount
        </Button>
      );
    if (insufficientBalance)
      return (
        <Button variant="secondary" className="w-full" disabled>
          Insufficient Balance
        </Button>
      );
    return (
      <Button
        variant="secondary"
        className="w-full"
        onClick={onSubmit}
        disabled={isLoading}
      >
        Submit Order
      </Button>
    );
  }, [connected, sellAmount, insufficientBalance, onSubmit, isLoading]);

  return buttonJsx;
}

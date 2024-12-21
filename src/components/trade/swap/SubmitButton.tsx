import { useWallet } from "@solana/wallet-adapter-react";
import { Token } from "@/lib/interfaces/tokensList";

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
  const { connected, connect } = useWallet();

  const handleClick = async () => {
    if (!connected) {
      try {
        await connect();
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
      return;
    }
    onSubmit();
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading || (!connected && !connect) || (connected && (!sellAmount || !sellToken))}
      className="w-full rounded-full bg-[#c7f284] hover:bg-[#d8ff9c] disabled:opacity-50 disabled:cursor-not-allowed p-4 text-black font-semibold transition-colors duration-200"
    >
      {isLoading ? (
        "Loading..."
      ) : !connected ? (
        "Connect Wallet"
      ) : !sellAmount || !sellToken ? (
        "Enter an amount"
      ) : (
        "Swap"
      )}
    </button>
  );
}

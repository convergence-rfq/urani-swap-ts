import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import { useSwap } from "./swap/SwapProvider";
import TokenSelector from "./TokenSelector";

interface TradeSelectorProps {
  typeSelected: string;
}

export default function TradeSelectors({ typeSelected }: TradeSelectorProps) {
  const { 
    sellAmount, 
    setSellAmount,
    buyAmount,
    setBuyAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken,
  } = useSwap();

  return (
    <div className="space-y-4">
      <TokenSelector
        inputValue={sellAmount}
        setInputValue={setSellAmount}
        selectedToken={sellSelectedToken}
        setSelectedToken={setSellSelectedToken}
        label="You sell"
        typeSelected={typeSelected}
        isSell={true}
        otherToken={buySelectedToken}
        setOtherToken={setBuySelectedToken}
      />
      <TokenSelector
        inputValue={buyAmount}
        setInputValue={setBuyAmount}
        selectedToken={buySelectedToken}
        setSelectedToken={setBuySelectedToken}
        label="You buy"
        typeSelected={typeSelected}
        otherToken={sellSelectedToken}
        setOtherToken={setSellSelectedToken}
      />
    </div>
  );
} 
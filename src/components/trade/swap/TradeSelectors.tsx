import InverterButton from "../InverterButton";
import TokenSelector from "../TokenSelector";
import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import { useSwap } from "./SwapProvider";

interface TradeSelectorsProps {
  sellingTokenToUSD?: number | null;
  buyingTokenToUSD?: number | null;
  isLoading: boolean;
  typeSelected: string;
  
}

export default function TradeSelectors({
  sellingTokenToUSD,
  buyingTokenToUSD,
  isLoading,
  typeSelected
}: TradeSelectorsProps) {
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

  const invertAmounts = useInvertAmounts();

  return (
    <>
      <div className="mb-1 mt-4">
        <TokenSelector
          label="Sell Amount"
          inputValue={sellAmount}
          setInputValue={setSellAmount}
          setSelectedToken={setSellSelectedToken}
          selectedToken={sellSelectedToken}
          tokenToUSDPrice={sellingTokenToUSD}
          typeSelected={typeSelected}
        />
      </div>
      <InverterButton onInvert={invertAmounts} isLoading={isLoading} />
      <div className="mb-4 mt-1">
        <TokenSelector
          label="Buy Amount"
          inputValue={buyAmount}
          setInputValue={setBuyAmount}
          setSelectedToken={setBuySelectedToken}
          selectedToken={buySelectedToken}
          tokenToUSDPrice={buyingTokenToUSD}
          typeSelected={typeSelected}
        />
      </div>
    </>
  );
}

import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import TokenSelector from "../TokenSelector";
import { useSwap } from "../swap/SwapProvider";
import useMarketPrices from "@/hooks/useMarketPrices";
import InverterButton from "../InverterButton";
import ToBuy from "./ToBuy";
import EveryTime from "./EveryTime";
import PriceRange from "./PriceRange";
import SubmitButton from "../swap/SubmitButton";
import { useSubmitLimitOrder } from "@/hooks/useSubmitLimitOrder";
export default function DcaForm() {
    const {
        sellAmount,
        setSellAmount,
        sellSelectedToken,
        setSellSelectedToken,
        buySelectedToken,
      } = useSwap();
      const invertAmounts = useInvertAmounts();
      const onSubmit = useSubmitLimitOrder();
      const {
        sellingTokenToUSD,
        isLoading
      } = useMarketPrices(sellSelectedToken?.symbol, buySelectedToken?.symbol);
    return (
        <>
            <div className="w-full h-full flex flex-col gap-4">
                <TokenSelector
                    label="I Want To Allocate"
                    inputValue={sellAmount}
                    setInputValue={setSellAmount}
                    setSelectedToken={setSellSelectedToken}
                    selectedToken={sellSelectedToken}
                    tokenToUSDPrice={sellingTokenToUSD}
                />
                 <InverterButton
                        onInvert={invertAmounts}
                        icon="arrow_downward"
                        isLoading={isLoading}
                    />
                <ToBuy setSelectedToken={setSellSelectedToken}
                            selectedToken={sellSelectedToken}/>
                <EveryTime/>
                <PriceRange/>
                <div className="mt-0 md:mt-0">
                    <SubmitButton
                    onSubmit={onSubmit}
                    sellAmount={sellAmount}
                    sellToken={sellSelectedToken}
                    isLoading={isLoading}
                    />
                </div>
            </div>
        </>
    )
}
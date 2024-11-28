import { useInvertAmounts } from "@/hooks/useInvertAmounts";
import TokenSelector from "../TokenSelector";
import { useSwap } from "../swap/SwapProvider";
import useMarketPrices from "@/hooks/useMarketPrices";
import InverterButton from "../InverterButton";
import SubmitButton from "../swap/SubmitButton";
import { useSubmitLimitOrder } from "@/hooks/useSubmitLimitOrder";
import ToBuy from "../dca/ToBuy";
import VaTimeDate from "./VaTimeDate";
interface AutoSetting {
    autoSelected: string;
    setAutoSelected: (tab: "auto" | "manually") => void;
  }
export default function VaForm({autoSelected,setAutoSelected}:AutoSetting) {
  const {
    sellAmount,
    setSellAmount,
    sellSelectedToken,
    setSellSelectedToken,
    buySelectedToken,
  } = useSwap();
  const invertAmounts = useInvertAmounts();
  const onSubmit = useSubmitLimitOrder();
  const { sellingTokenToUSD, isLoading } = useMarketPrices(
    sellSelectedToken?.symbol,
    buySelectedToken?.symbol,
  );


  return (
    <>
      <div className="w-full h-full flex flex-col gap-4">
        <div>
          <TokenSelector
            label="I Have A Max Budget Of"
            inputValue={sellAmount}
            setInputValue={setSellAmount}
            setSelectedToken={setSellSelectedToken}
            selectedToken={sellSelectedToken}
            tokenToUSDPrice={sellingTokenToUSD}
          />
          <div className="px-2 rounded-lg text-xs flex items-center space-x-2 text-[#F04A44] mt-1">
            <div className="h-3 w-3 fill-current">
              <svg
                width="12"
                height="12"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM9.92241 12.7161C9.33883 12.7166 8.86044 12.2546 8.83983 11.6715L8.5861 4.52054C8.57553 4.22663 8.68548 3.94172 8.88952 3.73028C9.09356 3.51884 9.37477 3.3999 9.66868 3.3999H10.1761C10.47 3.3999 10.7513 3.51884 10.9553 3.73028C11.1593 3.94172 11.2693 4.22664 11.2587 4.52054L11.005 11.6715C10.9844 12.2546 10.506 12.7166 9.92241 12.7161ZM9.92228 16.772C10.7633 16.772 11.4447 16.0906 11.4447 15.2496C11.4447 14.4086 10.7633 13.7272 9.92228 13.7272C9.08128 13.7272 8.3999 14.4086 8.3999 15.2496C8.3999 16.0906 9.08128 16.772 9.92228 16.772Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div className="flex">Please enter a minimum budget of 100 USD</div>
          </div>
        </div>
        <InverterButton
          onInvert={invertAmounts}
          icon="arrow_downward"
          isLoading={isLoading}
        />
        <ToBuy
          setSelectedToken={setSellSelectedToken}
          selectedToken={sellSelectedToken}
        />
        <div className="flex flex-col">
          <div className="flex flex-col space-y-3 rounded-xl border border-transparent bg-[#131b24] p-4 group focus-within:border-[#c7f28280]/50 focus-within:shadow-swap-input-dark">
            <span className="text-xs font-medium text-white/50">
              To Increase Portfolio Value By
            </span>
            <div className="flex items-center justify-between">
              <span className="rounded-lg bg-[#1c2936] px-3 py-2 text-center text-sm font-semibold text-white">
                USD
              </span>
              <input
                type="text"
                value="2"
                className="h-full w-full bg-transparent text-right font-semibold text-white placeholder:text-white/25 disabled:cursor-not-allowed disabled:text-black disabled:opacity-100 text-xl !outline-none border-none focus:ring-0"
              />
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <VaTimeDate />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/50">
            Auto receive $SOL after every buy
          </span>
          <div className="flex h-9 items-center rounded-lg bg-[#131b24] p-1">
            <button
              type="button"
              onClick={() => setAutoSelected("auto")}
              className={`h-7 w-[75px] lg:w-20 flex flex-row items-center justify-center space-x-2 rounded-lg border border-transparent text-white/50 fill-current font-semibold ${autoSelected === "auto" && 'text-[#c7f284]/50 p-0.5 !bg-[#c7f284]/10'}`}
            >
              <span className={`whitespace-nowrap !text-xxs font-semibold md:!text-xs ${autoSelected === "auto" && 'text-[#c7f284] p-0.5'}`}>
                Auto
              </span>
            </button>
            <button
              type="button"
              onClick={() => setAutoSelected("manually")}
              className={`h-7 w-[75px] lg:w-20 flex flex-row items-center justify-center space-x-2 rounded-lg border border-transparent fill-current font-semibold text-white/50 p-0.5 ${autoSelected === "manually" && 'text-[#c7f284]/50 p-0.5 !bg-[#c7f284]/10'}`}
            >
              <span className={`whitespace-nowrap !text-xxs font-semibold md:!text-xs ${autoSelected === "manually" && 'text-[#c7f284] p-0.5'}`}>
                Manually
              </span>
            </button>
          </div>
        </div>
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
  );
}

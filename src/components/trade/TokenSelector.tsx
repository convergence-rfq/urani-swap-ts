import { NumberInput } from "@mantine/core";
import { Token } from "@/lib/interfaces/tokensList";
import TokenListModal from "./token-list-modal/TokenListModal";
import TokenSelectorButton from "./TokenSelectorButton";
import { useDisclosure } from "@mantine/hooks";

interface TokenSelectorProps {
  inputValue: string | number;
  setInputValue: (value: string | number) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token) => void;
  tokenToUSDPrice?: number | null;
  label?: string;
  typeSelected: string;
}

export default function TokenSelector({
  inputValue,
  setInputValue,
  selectedToken,
  setSelectedToken,
  tokenToUSDPrice,
  label,
  typeSelected,
}: TokenSelectorProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const convertedToUSD =
    tokenToUSDPrice &&
    inputValue &&
    (Number(inputValue || 0) * tokenToUSDPrice).toFixed(2);
  console.log("typeSelected", typeSelected);
  return (
    <>
      {/* <div className="rounded-2xl border-[1px]   border-[#202629] hover:border-cyan selection:text-purple-medium selection:bg-purple-medium-dark"> */}
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
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M8.25 7H8.255M1.5 2.5V9.5C1.5 10.0523 1.94772 10.5 2.5 10.5H9.5C10.0523 10.5 10.5 10.0523 10.5 9.5V4.5C10.5 3.94772 10.0523 3.5 9.5 3.5L2.5 3.5C1.94772 3.5 1.5 3.05228 1.5 2.5ZM1.5 2.5C1.5 1.94772 1.94772 1.5 2.5 1.5H8.5M8.5 7C8.5 7.13807 8.38807 7.25 8.25 7.25C8.11193 7.25 8 7.13807 8 7C8 6.86193 8.11193 6.75 8.25 6.75C8.38807 6.75 8.5 6.86193 8.5 7Z"
                        stroke="currentColor"
                        stroke-opacity="0.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    0.000123 USDC
                  </span>
                  <span className="px-3 py-1 text-[13px] rounded-[6px] bg-[#1c2936] text-white/75">
                    HALF
                  </span>
                  <span className="px-3 py-1 text-[13px] rounded-[6px] bg-[#1c2936] text-white/75">
                    MAX
                  </span>
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
        />
        {convertedToUSD ? (
          <div className="text-xs text-[#e8f9ff80] text-right mr-3 mb-3">
            ≈ $ {convertedToUSD || 0}
          </div>
        ) : null}
      </div>
      <TokenListModal
        opened={opened}
        open={open}
        close={close}
        setSelectedToken={setSelectedToken}
      />
    </>
  );
}

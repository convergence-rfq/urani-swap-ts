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
}

export default function TokenSelector({
  inputValue,
  setInputValue,
  selectedToken,
  setSelectedToken,
  tokenToUSDPrice,
  label,
}: TokenSelectorProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const convertedToUSD =
    tokenToUSDPrice &&
    inputValue &&
    (Number(inputValue || 0) * tokenToUSDPrice).toFixed(2);

  return (
    <>
      {/* <div className="rounded-2xl border-[1px]   border-[#202629] hover:border-cyan selection:text-purple-medium selection:bg-purple-medium-dark"> */}
      <div className="relative flex min-h-[124px] flex-col space-y-3 rounded-xl border border-transparent p-4 focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark bg-[#131b24]">
        <NumberInput
          label={label}
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
            label: "ml-1 text-sm font-bold text-white",
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

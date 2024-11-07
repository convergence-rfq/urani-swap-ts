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
      <div className="rounded-2xl selection:text-purple-medium selection:bg-purple-medium-dark">
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
            label: "ml-4 mb-4 text-sm font-bold text-white",
            section: "ml-1 md:ml-4 w-auto -mt-24 sm:-mt-0",
            input:
              "bg-[#121618] text-right text-white pr-3 rounded-[25px] text-xl sm:text-3xl border-0 focus:ring-0 focus:border-0 bg-transparent mt-12 sm:mt-0",
          }}
        />
        {convertedToUSD ? (
          <div className="text-xs text-white text-right mr-3 mb-3">
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

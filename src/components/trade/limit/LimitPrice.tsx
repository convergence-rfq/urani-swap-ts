import { Button } from "../../ui/button";
import { NumberInput } from "@mantine/core";
import TokenSelectorButton from "../TokenSelectorButton";
import { Token } from "@/lib/interfaces/tokensList";
import { useDisclosure } from "@mantine/hooks";
import TokenListModal from "../token-list-modal/TokenListModal";

interface LimitPriceProps {
  inputValue: string | number;
  setInputValue: (value: string | number) => void;
  resetToMarket: () => void;
  label?: string;
  selectedToken: Token | null;
  setSelectedToken: (token: Token) => void;
}

export default function LimitPrice({
  inputValue,
  setInputValue,
  resetToMarket,
  selectedToken,
  setSelectedToken,
  label = "Limit price",
}: LimitPriceProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    // <div className="rounded-2xl border-[1px] border-[#202629] hover:border-cyan  selection:text-purple-medium selection:bg-purple-medium-dark">
    <>
    <div className="relative flex min-h-[124px] flex-col space-y-3 rounded-xl border border-transparent p-4 focus-within:border-v2-primary/50 focus-within:shadow-swap-input-dark bg-[#131b24]">
      <NumberInput
        aria-label={label}
        variant="unstyled"
        clampBehavior="strict"
        label={label}
        allowNegative={false}
        leftSection={
          <TokenSelectorButton onClick={open} token={selectedToken} />
        }
        rightSection={
          <Button
            size="xs"
            onClick={resetToMarket}
            className="text-[#AEB9B8] bg-[#202629] -mt-16 hover:bg-[#262e33] hover:text-white"
          >
            Set to market
          </Button>
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

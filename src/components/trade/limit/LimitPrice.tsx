import { Button } from "../../ui/button";
import { NumberInput } from "@mantine/core";

interface LimitPriceProps {
  inputValue: string | number;
  setInputValue: (value: string | number) => void;
  resetToMarket: () => void;
  label?: string;
}

export default function LimitPrice({
  inputValue,
  setInputValue,
  resetToMarket,
  label = "Limit price",
}: LimitPriceProps) {
  return (
    // <div className="rounded-2xl border-[1px] border-[#202629] hover:border-cyan  selection:text-purple-medium selection:bg-purple-medium-dark">
    <div className="rounded-2xl selection:text-purple-medium selection:bg-purple-medium-dark">
      <NumberInput
        aria-label={label}
        variant="unstyled"
        clampBehavior="strict"
        label={label}
        allowNegative={false}
        rightSection={
          <Button size="xs" onClick={resetToMarket}>
            Set to market
          </Button>
        }
        hideControls
        size="xl"
        value={inputValue}
        onChange={setInputValue}
        placeholder="0.00"
        classNames={{
          section: "-mt-20 md:-mt-24 mr-2 w-auto",
          label: "ml-4 mb-4 text-sm font-bold text-white",
          input:
            "bg-[#121618] text-right text-white pr-3 rounded-[25px] text-xl sm:text-3xl border-0 focus:ring-0 focus:border-0  relative z-10",
        }}
      />
    </div>
  );
}

import { useDisclosure } from "@mantine/hooks";
import TokenListModal from "../token-list-modal/TokenListModal";
import TokenSelectorButton from "../TokenSelectorButton";
import { Token } from "@/lib/interfaces/tokensList";
import ToBuyTokenSelectorButton from "../ToBuyTokenSelectorButton";

interface ToBuyProps {
  label?: string;
  selectedToken: Token | null;
  setSelectedToken: (token: Token) => void;
}
export default function ToBuy({ selectedToken, setSelectedToken }: ToBuyProps) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <div className="flex min-h-[124px] flex-col rounded-xl border border-transparent bg-[#131b24] p-4 group hover:border-[#c7f28280]/50 hover:shadow-swap-input-dark">
        <div className="mb-6 flex items-center justify-between ">
          <span className="text-sm font-medium text-white">To Buy</span>
        </div>
        <ToBuyTokenSelectorButton onClick={open} token={selectedToken}/>
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

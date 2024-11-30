import Image from "next/image";
import { Token } from "@/lib/interfaces/tokensList";

interface TokenSelectorButtonProps {
  onClick: () => void;
  token: Token | null;
}

export default function TokenSelectorButton({
  onClick,
  token,
}: TokenSelectorButtonProps) {
  return (
    <>
    <div className="group/select flex items-center justify-between">
      <button
        onClick={onClick}
        className="flex h-10 items-center rounded-[8px] transition-all border-transparent px-3 py-2 border bg-[#1c2936] group-hover/select:border-[#c7f28280] group-hover/select:bg-[rgba(199,242,132,0.2)] group-hover/select:shadow-swap-input-dark group-hover/select:text-white"
      >
        {!token ? (
          "Select a token"
        ) : (
          <>
            <Image
              className="rounded-full mr-2 max-w-auto"
              width={20}
              height={20}
              src={token.logoURI}
              alt=""
            />
            <span className="font-medium text-[16px] group-hover/select:text-white">{token.symbol}</span>
            <span className="material-symbols-rounded ml-3 -mr-1 group-hover/select:text-[#c7f28280]">
              keyboard_arrow_down
            </span>
          </>
        )}
      </button>
    </div>
    </>
  );
}

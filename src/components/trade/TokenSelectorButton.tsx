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
    <button
      onClick={onClick}
      className="flex justify-center items-center text-center font-medium rounded-xl  hover:bg-[#262e33] hover:text-white transition-all px-3 py-2 shadow select-none text-white"
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
          <span className="font-medium text-[14px]">{token.symbol}</span>
          <span className="material-symbols-rounded ml-1 -mr-1">
            keyboard_arrow_down
          </span>
        </>
      )}
    </button>
  );
}

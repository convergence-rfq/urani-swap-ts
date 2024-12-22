import { Token } from "@/lib/interfaces/tokensList";
import Image from "next/image";

interface TokenListItemProps {
  item: Token;
  onClick: () => void;
}

export default function TokenListItem({ item, onClick }: TokenListItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-full p-4 hover:bg-[#1c2936] transition-colors"
    >
      <div className="flex items-center gap-3">
        {item.logoURI ? (
          <Image
            src={item.logoURI}
            alt={item.symbol}
            width={32}
            height={32}
            className="rounded-full"
            onError={(e) => {
              e.currentTarget.src = '/default-token-icon.png';
            }}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#202629] flex items-center justify-center">
            <span className="text-white/50 text-xs">{item.symbol.slice(0, 3)}</span>
          </div>
        )}
        <div className="flex flex-col items-start">
          <span className="text-white font-medium">{item.symbol}</span>
          <span className="text-white/50 text-sm">{item.name}</span>
        </div>
      </div>
    </button>
  );
}

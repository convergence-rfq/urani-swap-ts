import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import { useSwap } from "./swap/SwapProvider";
import TokenSelector from "./TokenSelector";
import { WalletContextState } from "@solana/wallet-adapter-react";

export type TradeSelectorsProps = {
  isLoading: boolean;
  typeSelected: string;
  getTokenBalance: (token: Token | TokenWithBalance) => Promise<number>;
  wallet: WalletContextState;
}

const TradeSelectors = ({ isLoading, typeSelected, getTokenBalance, wallet }: TradeSelectorsProps) => {
  const { 
    sellAmount, 
    setSellAmount, 
    buyAmount,
    setBuyAmount,
    sellSelectedToken, 
    setSellSelectedToken,
    buySelectedToken,
    setBuySelectedToken 
  } = useSwap();
  
  const handleSwap = () => {
    // Swap tokens
    const tempToken = sellSelectedToken;
    setSellSelectedToken(buySelectedToken);
    setBuySelectedToken(tempToken);
    
    // Swap amounts
    const tempAmount = sellAmount;
    setSellAmount(buyAmount);
    setBuyAmount(tempAmount);
  };

  return (
    <div className="flex flex-col gap-2">
      <TokenSelector
        inputValue={sellAmount}
        setInputValue={setSellAmount}
        selectedToken={sellSelectedToken}
        setSelectedToken={setSellSelectedToken}
        otherToken={buySelectedToken}
        setOtherToken={setBuySelectedToken}
        getTokenBalance={getTokenBalance}
        label="Sell Amount"
        typeSelected={typeSelected}
        wallet={wallet}
        isSell={true}
      />
      
      <div className="flex justify-center -my-2">
        <button 
          onClick={handleSwap}
          className="rounded-full p-2 hover:bg-[#1c2936] transition-colors"
        >
          <span className="material-symbols-rounded text-white/75">
            swap_vert
          </span>
        </button>
      </div>

      <TokenSelector
        inputValue={buyAmount}
        setInputValue={setBuyAmount}
        selectedToken={buySelectedToken}
        setSelectedToken={setBuySelectedToken}
        otherToken={sellSelectedToken}
        setOtherToken={setSellSelectedToken}
        getTokenBalance={getTokenBalance}
        label="Buy Amount"
        typeSelected={typeSelected}
        wallet={wallet}
        isSell={false}
      />
    </div>
  );
}

export default TradeSelectors; 
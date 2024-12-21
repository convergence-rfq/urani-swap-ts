import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

const baseClasses = `
  rounded-full
  border
  border-[#202629]
  p-4
  text-sm
  font-semibold
  leading-none
  min-h-[48px]
  min-w-[180px]
  flex
  items-center
  justify-center
  transition-colors
  duration-200
  wallet-connect-button
`;

const disconnectedClasses = `
  ${baseClasses}
  bg-[#131b24]
  hover:bg-[#1c2936]
  text-[#c7f284]
`;

const connectedClasses = `
  ${baseClasses}
  bg-[#c7f284]
  hover:bg-[#d8ff9c]
  text-black
`;

export default function WalletConnectionButton() {
  const { connected } = useWallet();

  return (
    <WalletMultiButton 
      className={connected ? connectedClasses : disconnectedClasses}
      style={{
        height: 'auto',
        minHeight: '48px',
        minWidth: '180px',
        borderRadius: '9999px',
        border: '1px solid #202629',
        ...connected ? {
          background: '#c7f284',
          color: 'black',
        } : {
          background: '#131b24',
          color: '#c7f284',
        }
      }}
    />
  );
}

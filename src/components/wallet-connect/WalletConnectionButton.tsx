import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

const classes =
  "rounded-3xl px-8 py-3 h-auto bg-cyan text-[#3E3172] shadow-md text-lg wallet-connect-button"; // Removed the border classes

export default function WalletConnectionButton() {
  return (
    <UnifiedWalletButton
      buttonClassName={classes}
      currentUserClassName={classes}
    />
  );
}

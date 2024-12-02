import { UnifiedWalletButton } from "@jup-ag/wallet-adapter";

const classes =
  "rounded-xl bg-v2-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 p-[calc(2rem-1px)] py-3 text-sm font-semibold leading-none wallet-connect-button"; // Removed the border classes

export default function WalletConnectionButton() {
  return (
    <UnifiedWalletButton
      buttonClassName={classes}
      currentUserClassName={classes}
    />
  );
}

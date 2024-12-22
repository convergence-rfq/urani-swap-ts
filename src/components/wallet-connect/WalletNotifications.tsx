"use client";

import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const notificationStyles = {
  root: "!bg-black !rounded-2xl !min-w-[320px] !p-5 !border-none !shadow-lg",
  title: "!text-white !text-2xl !font-bold !mb-1",
  description: "!text-gray-400",
  closeButton: {
    color: "#fff",
    "&:hover": { backgroundColor: "transparent" }
  }
};

const CheckIcon = () => (
  <div className="w-10 h-10 rounded-full bg-[#00ffa3] flex items-center justify-center">
    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
      <path d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z" fill="black"/>
    </svg>
  </div>
);

export default function WalletNotifications(): JSX.Element | null {
  const { connected, disconnecting, connecting, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !connecting) return;

    notifications.show({
      title: "Connecting Wallet",
      message: "Please approve the connection in your wallet",
      loading: true,
      classNames: notificationStyles,
      styles: {
        root: { backgroundColor: "#0F1111" },
        loader: { color: "#00ffa3" }
      },
      autoClose: 3000,
    });
  }, [connecting, mounted]);

  useEffect(() => {
    if (!mounted || !connected || !publicKey) return;

    notifications.show({
      title: "Wallet Connected",
      message: (
        <div className="space-y-1">
          <div className="text-gray-500 text-base">
            Connected to wallet {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
          <div className="text-[#00ffa3] text-base">Auto Confirm is available on Phantom.</div>
        </div>
      ),
      classNames: notificationStyles,
      styles: {
        root: { backgroundColor: "#0F1111" }
      },
      icon: <CheckIcon />,
      autoClose: 3000,
    });
  }, [connected, publicKey, mounted]);

  useEffect(() => {
    if (!mounted || !disconnecting) return;

    notifications.show({
      title: "Wallet Disconnected",
      message: "Your wallet has been disconnected",
      classNames: notificationStyles,
      styles: {
        root: { backgroundColor: "#0F1111" }
      },
      autoClose: 3000,
    });
  }, [disconnecting, mounted]);

  if (!mounted) return null;
  return null;
} 
"use client";

import type { ReactNode } from "react";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const notificationStyles = {
  root: "!bg-black !rounded-xl !min-w-[320px] !p-4 !border-none",
  title: "!text-white !text-xl !font-semibold !mb-1",
  description: "!text-gray-400",
  closeButton: {
    color: "#fff",
    "&:hover": { backgroundColor: "transparent" }
  }
};

const CheckIcon = () => (
  <div className="w-8 h-8 rounded-full bg-[#00ffa3] flex items-center justify-center">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
        root: { backgroundColor: 'black' },
        loader: { color: '#00ffa3' }
      },
      autoClose: 3000,
    });
  }, [connecting, mounted]);

  useEffect(() => {
    if (!mounted || !connected || !publicKey) return;

    notifications.show({
      title: "Wallet Connected",
      message: (
        <div>
          <div className="text-gray-400">
            Connected to wallet {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </div>
          <div className="text-[#00ffa3]">Auto Confirm is available on Phantom.</div>
        </div>
      ),
      classNames: notificationStyles,
      styles: {
        root: { backgroundColor: 'black' }
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
        root: { backgroundColor: 'black' }
      },
      autoClose: 3000,
    });
  }, [disconnecting, mounted]);

  if (!mounted) return null;
  return null;
} 
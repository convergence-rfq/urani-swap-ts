"use client";

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { notifications } from '@mantine/notifications';

const notificationStyles = {
  root: "bg-black rounded-xl min-w-[320px] p-4",
  title: "text-white text-xl font-semibold",
  description: "text-gray-400 mt-1",
  closeButton: "text-gray-400 hover:text-white absolute top-4 right-4",
};

export default function WalletNotifications() {
  const { connected, disconnecting, connecting, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (connecting) {
      notifications.show({
        title: 'Connecting Wallet',
        message: 'Please approve the connection in your wallet',
        loading: true,
        classNames: notificationStyles,
        styles: {
          root: { background: '#000000' },
          loader: { color: '#c7f284' }
        },
        autoClose: 3000
      });
    }
  }, [connecting, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (connected && publicKey) {
      notifications.show({
        title: 'Wallet Connected',
        message: (
          <div>
            <div className="text-gray-400">Connected to wallet {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}</div>
            <div className="text-[#c7f284]">Auto Confirm is available on Phantom.</div>
          </div>
        ),
        classNames: notificationStyles,
        styles: {
          root: { background: '#000000' }
        },
        icon: (
          <div className="w-8 h-8 rounded-full bg-[#c7f284] flex items-center justify-center">
            <span className="material-symbols-rounded text-black">check</span>
          </div>
        ),
        autoClose: 3000
      });
    }
  }, [connected, publicKey, mounted]);

  useEffect(() => {
    if (!mounted) return;

    if (disconnecting) {
      notifications.show({
        title: 'Wallet Disconnected',
        message: 'Your wallet has been disconnected',
        classNames: notificationStyles,
        styles: {
          root: { background: '#000000' }
        },
        autoClose: 3000
      });
    }
  }, [disconnecting, mounted]);

  if (!mounted) return null;
  return null;
} 
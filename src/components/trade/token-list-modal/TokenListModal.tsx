"use client";

import { Modal } from "@mantine/core";
import { Token, TokenWithBalance } from "@/lib/interfaces/tokensList";
import TokenListItem from "./TokenListItem";

interface TokenListModalProps {
  opened: boolean;
  close: () => void;
  onSelect: (token: Token | TokenWithBalance) => void;
  tokens: (Token | TokenWithBalance)[];
}

export default function TokenListModal({ opened, close, onSelect, tokens }: TokenListModalProps) {
  return (
    <Modal opened={opened} onClose={close} title="Select Token" centered>
      <div className="space-y-2">
        {tokens.map((token) => (
          <TokenListItem
            key={token.address}
            token={token}
            onClick={() => {
              onSelect(token);
              close();
            }}
          />
        ))}
      </div>
    </Modal>
  );
}

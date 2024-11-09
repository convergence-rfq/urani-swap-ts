import { Modal, TextInput } from "@mantine/core";

import { Token } from "@/lib/interfaces/tokensList";
import TokenListItem from "./TokenListItem";
import { useFilteredTokens } from "@/hooks/useFilteredTokens";
import { useState } from "react";

interface TokenListModalProps {
  opened: boolean;
  open: () => void;
  close: () => void;
  setSelectedToken: (token: Token) => void;
}

export default function TokenListModal({
  opened,
  close,
  setSelectedToken,
}: TokenListModalProps) {
  const [inputText, setInputText] = useState("");
  const filteredTokensList = useFilteredTokens(inputText);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        setInputText("");
        close();
      }}
      title="Select a token"
      centered
      radius="lg"
      classNames={{
        content: "bg-[#121618] text-white token_select_modal",
        header: "bg-[#121618] sticky text-white token_select_modal_header",
        title: "font-bold text-xl text-white",
      }}
    >
      <TextInput
        radius="lg"
        size="lg"
        placeholder="Search name or paste address"
        value={inputText}
        onChange={(event) => setInputText(event.currentTarget.value)}
        classNames={{
          input:
            "bg-[#080c0e] border-0 rounded-[20px] focus:ring-0 focus:border-0 text-white",
        }}
      />

      <div className="-mx-4">
        {filteredTokensList.map((item) => (
          <TokenListItem
            key={item.address}
            item={item}
            onClick={() => {
              setSelectedToken(item);
              close();
            }}
          />
        ))}
      </div>
    </Modal>
  );
}

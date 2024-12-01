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
      radius="lg"
      classNames={{
        content: "bg-[#313e4c] text-white token_select_modal",
        header: "bg-[#313e4c] sticky text-white token_select_modal_header",
        title: "font-bold text-xl text-white",
      }}
    >
      <TextInput
        radius="lg"
        size="lg"
        leftSection={
          <span><svg width="14" height="14" viewBox="0 0 18 18" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M7.30327 14.6058C8.75327 14.6074 10.1705 14.1746 11.3729 13.3637L15.5971 17.5871C16.1463 18.1371 17.0377 18.1371 17.5877 17.5871C18.1377 17.0371 18.1377 16.1457 17.5877 15.5964L13.3643 11.3722C14.5823 9.55661 14.9229 7.28943 14.2909 5.19563C13.6596 3.10183 12.1229 1.40183 10.1033 0.56283C8.08365 -0.276231 5.79385 -0.16607 3.86505 0.86283C1.93537 1.89251 0.569053 3.73243 0.140853 5.87683C-0.286487 8.02143 0.269759 10.2448 1.65725 11.9354C3.04397 13.6261 5.11665 14.6064 7.30325 14.6058H7.30327ZM7.30327 1.68943C8.79233 1.68865 10.2197 2.28005 11.2729 3.33319C12.3252 4.38631 12.9166 5.81359 12.9166 7.30279C12.9166 8.79199 12.3252 10.2192 11.2729 11.2724C10.2198 12.3247 8.79247 12.9162 7.30327 12.9162C5.81407 12.9162 4.38687 12.3247 3.33367 11.2724C2.28133 10.2193 1.68913 8.79199 1.68991 7.30279C1.69148 5.81451 2.28287 4.38719 3.33523 3.33479C4.38759 2.28239 5.81483 1.69103 7.30323 1.68947L7.30327 1.68943Z" fill="#ffffff"></path></svg></span>
        }
        placeholder="Search name or paste address"
        value={inputText}
        onChange={(event) => setInputText(event.currentTarget.value)}
        classNames={{
          input:
            "bg-[#313e4c] border-0 rounded-[20px] focus:ring-0 focus:border-0 text-white",
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

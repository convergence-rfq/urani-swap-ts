import { Select } from "@mantine/core";

const options = [
  { value: "5|m", label: "5 minutes" },
  { value: "30|m", label: "30 minutes" },
  { value: "1|h", label: "1 hour" },
  { value: "1|d", label: "1 day" },
  { value: "3|d", label: "3 days" },
  { value: "7|d", label: "7 days" },
  { value: "1|M", label: "1 month" },
];

interface SelectTimeProps {
  label?: string;
  setExpireTime: (value: string | null) => void;
  expireTime: string | null;
}

export default function DcaTimeSelect({
  label = "Expiry",
  setExpireTime,
  expireTime,
}: SelectTimeProps) {
  return (
    <div className="relative flex items-center flex-col space-y-3 rounded-xl border border-transparent p-0 bg-[#131b24]">
      <Select
        aria-label={label}
        // label={label}
        value={expireTime}
        variant="unstyled"
        size="md"
        data={options}
        onChange={setExpireTime}
        rightSectionWidth={15}
        rightSection={<span className="material-symbols-rounded ml-auto mt-1  font-sm text-[#e8f9ff40]">
            keyboard_arrow_down
          </span>}
        classNames={{
          option: "hover:bg-[#282830] hover:text-white rounded-none text-xs text-white",
          dropdown: "w-auto rounded-lg bg-white/5 bg-none shadow-xl backdrop-blur-xl transition-opacity !bg-transparent !shadow-none border-none",
        //   label: "ml-4 mt-3 mb-3 text-sm font-bold text-white",
          input:
            "text-right text-white font-semibold rounded-2xl pr-5 text-sm border-0 focus:ring-0 focus:shadow-none focus:border-0 bg-transparent p-0",
        }}
      />
    </div>
  );
}

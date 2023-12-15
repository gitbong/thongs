import React from "react";

interface Props {
  name: string;
  value?: string;
  options: { label: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<Props> = ({
  name,
  value = "",
  options = [],
  onChange,
}) => {
  return (
    <div className="relative">
      <select
        title={name}
        data-testid={name}
        className="overflow-ellipsis text-sm w-full pl-3 pr-8 py-2 outline-none border border-solid border-gray-200 rounded appearance-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-all "
        onChange={onChange}
        value={value}
      >
        {options.map(({ label, value }, idx) => (
          <option key={idx} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="selectIcon" />
    </div>
  );
};

export default Select;

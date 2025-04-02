import { Box, Input } from "@mui/material";
import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const InputBox: React.FC<InputProps> = ({
  label,
  placeholder = "検索",
  value,
  onChange,
}) => {
  return (
    <Box className="flex items-center w-full h-10 border border-gray-300 rounded-md overflow-hidden">
      <Box className="whitespace-nowrap text-gray-700 text-sm font-medium px-3 flex items-center justify-center w-20 h-10 border-r border-gray-300">
        {label}
      </Box>
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="flex-1 px-3 py-2 outline-none"
      />
    </Box>
  );
};

export default InputBox;

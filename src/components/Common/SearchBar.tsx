import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Buttons from "./Buttons"; //

interface SearchBarProps {
  label?: string;
  onSearch?: (value: string) => void;
  onFilterChange?: (value: string) => void;
  isCreatePage?: boolean;
}

const SearchBar = ({
  label,
  onSearch,
  onFilterChange,
  isCreatePage,
}: SearchBarProps) => {
  return (
    <Box className="flex items-center h-10 border border-gray-300 rounded-md overflow-hidden">
      {label && (
        <Box className="whitespace-nowrap text-gray-700 text-sm font-medium px-3 flex items-center justify-center w-20 h-10 border-r border-gray-300 ">
          {label}
        </Box>
      )}
      <TextField
        size="small"
        placeholder="検索語を入力してください"
        onChange={(e) => onSearch?.(e.target.value)}
        sx={{ width: 250 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;

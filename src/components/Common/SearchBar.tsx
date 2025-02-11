import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Buttons from "./Buttons"; //

interface SearchBarProps {
  onSearch?: (value: string) => void;
  onFilterChange?: (value: string) => void;
  isCreatePage?: boolean;
}

const SearchBar = ({
  onSearch,
  onFilterChange,
  isCreatePage,
}: SearchBarProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
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

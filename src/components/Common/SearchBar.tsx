import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Buttons from "./Buttons"; // Buttons 컴포넌트 임포트

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

      <TextField
        select
        size="small"
        defaultValue=""
        onChange={(e) => onFilterChange?.(e.target.value)}
        sx={{ width: 150 }}
      >
        <MenuItem value="">1</MenuItem>
        <MenuItem value="waiting">2</MenuItem>
        <MenuItem value="progress">3</MenuItem>
        <MenuItem value="completed">4</MenuItem>
      </TextField>
    </Box>
  );
};

export default SearchBar;

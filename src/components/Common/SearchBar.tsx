//Next.jsの特性でサーバーComponentsに切り替えがdefaultだけど、OnchangeとOnclickはClientのイベントだから
// 文法的に "use client"だと表示することが必要である。
"use client";

//Mui
import {
  Box,
  TextField,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  onSearch?: (value: string) => void;
  onFilterChange?: (value: string) => void;
}

const SearchBar = ({ onSearch, onFilterChange }: SearchBarProps) => {
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

      <Button
        variant="outlined"
        onClick={() => {
          console.log("検索する。");
        }}
      >
        検索する
      </Button>
    </Box>
  );
};

export default SearchBar;

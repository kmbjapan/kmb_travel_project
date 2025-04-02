import { MenuItem, TextField } from "@mui/material";

interface SelectBoxProps {
  onFilterChange?: (value: string) => void;
}

const SelectBox = ({ onFilterChange }: SelectBoxProps) => {
  return (
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
  );
};

export default SelectBox;

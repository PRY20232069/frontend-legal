import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomTextField = styled(TextField)(() => ({
  backgroundColor: "#FBFAFB",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
  },
  "& .MuiInputBase-input": {
    color: "#668D84",
    border: "#FBFAFB 1px solid",
    padding: "12px 12px",
  },
}));

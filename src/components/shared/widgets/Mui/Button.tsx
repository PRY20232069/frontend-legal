import { Button, styled } from "@mui/material";

export const CustomButton = styled(Button)(() => ({
  backgroundColor: "#193A32",
  fontWeight: 700,
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: "#27826c",
  },
}));

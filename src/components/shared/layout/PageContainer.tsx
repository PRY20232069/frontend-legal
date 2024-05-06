import { Box, Container } from "@mui/material";
import { DrawerHeader } from "../Material";

export const PageContainer = (props: any) => {
  return (
    <Box component="main" style={{ width: "100%" }}>
      <DrawerHeader />
      <Container maxWidth="md" style={{ padding: "40px 70px" }}>
        {props.children}
      </Container>
    </Box>
  );
};

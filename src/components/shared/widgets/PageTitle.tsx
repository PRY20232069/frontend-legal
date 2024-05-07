import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const TitleH2 = styled.h2`
  margin-bottom: 0;
`;

export const PageTitle = (props: any) => {
  return (
    <Typography variant="h5" color="#193A32" sx={{ mb: 2, fontWeight: "bold" }}>
      {props.children}
    </Typography>
  );
};

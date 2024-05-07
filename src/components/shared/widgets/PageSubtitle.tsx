import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const SubtitleH3 = styled.h3`
  font-size: 17px;
  font-weight: 500;
  margin-top: 0;
`;

export const PageSubtitle = (props: any) => {
  return (
    <Typography variant="body1" color="gray" sx={{ mb: 2 }}>
      {props.children}
    </Typography>
  );
};

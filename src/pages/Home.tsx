import { PageContainer } from "../components/shared/layout/PageContainer";
import { RecentContractsList } from "../components/home/widgets/RecentContractsList";
import { QuickActions } from "../components/home/widgets/QuickActions";
import { WelcomeLegalAdvices } from "../components/home/widgets/WelcomeLegalAdvices";
import { Container, Grid, Typography } from "@mui/material";
import AdviseImg from "../assets/svgs/consejos.svg";

export const Home = () => {
  return (
    <PageContainer>
      <Typography
        variant="h5"
        color="#193A32"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Bienvenido
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          backgroundColor: "#FDF4E6",
          pb: 1,
          pr: 1,
          justifyContent: "center",
          alignItems: "start",
          borderRadius: "10px",
          margin: 0,
        }}
      >
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <img src={AdviseImg} />
        </Grid>
        <Grid item xs={12} md={8}>
          <WelcomeLegalAdvices />
        </Grid>
      </Grid>
      <QuickActions />
      <RecentContractsList />
    </PageContainer>
  );
};

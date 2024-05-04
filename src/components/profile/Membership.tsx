import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IProfile } from "../../interfaces/IProfile";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomButton } from "../shared/widgets/Mui/Button";
import { CustomTextField } from "../shared/widgets/Mui/Input";

interface IMembership {
  data: IProfile;
  setOpen: (state: boolean) => void;
}

const Membership: React.FC<IMembership> = (props) => {
  return (
    <Box
      sx={{
        my: 4,
        border: "#EBF0EC 2px solid",
        p: 3,
        mr: 5,
        borderRadius: "4px",
        maxWidth: 1000,
      }}
    >
      <Typography
        variant="h6"
        color="primary"
        sx={{ mb: 1, fontWeight: "bold" }}
      >
        Membresia
      </Typography>

      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
            Plan
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            value={props.data.membership.plan.planName}
            disabled
            sx={{ width: "80%" }}
            fullWidth
          />
        </Grid2>
        <Grid2
          xs={12}
          md={6}
          sx={{ mb: 2, display: "flex", alignItems: "center" }}
        >
          <CustomButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => props.setOpen(true)}
          >
            Upgrade
          </CustomButton>
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
            Limite del plan
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            value={props.data.membership.plan.limit}
            sx={{ width: "80%" }}
            fullWidth
            disabled
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
            Uso del plan a la fecha
          </Typography>
          <CustomTextField
            variant="outlined"
            margin="normal"
            value={props.data.membership.usage}
            sx={{ width: "80%" }}
            fullWidth
            disabled
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Membership;

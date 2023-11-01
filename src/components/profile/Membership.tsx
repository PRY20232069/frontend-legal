import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IProfile } from "../../interfaces/IProfile";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IMembership {
  data: IProfile;
  setOpen: (state: boolean) => void;
}

const Membership: React.FC<IMembership> = (props) => {
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        Membresia
      </Typography>

      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Plan"
            variant="standard"
            value={props.data.membership.plan.planName}
            disabled
            sx={{ mb: 2 }}
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <button onClick={() => props.setOpen(true)}>{"Upgrade"}</button>
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Limite del plan"
            variant="standard"
            value={props.data.membership.plan.limit}
            disabled
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Uso del plan a la fecha"
            variant="standard"
            value={props.data.membership.usage}
            disabled
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Membership;

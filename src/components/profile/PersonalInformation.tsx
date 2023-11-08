import React from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IProfile } from "../../interfaces/IProfile";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface IPersonalInfo {
  data: IProfile;
}

const PersonalInformation: React.FC<IPersonalInfo> = (props) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        Datos personales
      </Typography>
      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Nombre"
            variant="standard"
            value={props.data.personalInformation.name}
            disabled
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Apellido"
            variant="standard"
            value={props.data.personalInformation.lastName}
            disabled
          />
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Fecha de cumpleaños"
            variant="standard"
            value={props.data.personalInformation.birthday}
            disabled
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Documento de identidad"
            variant="standard"
            value={props.data.personalInformation.document}
            disabled
          />
        </Grid2>
      </Grid2>
      <Grid2 container>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Correo electrónico"
            variant="standard"
            value={props.data.personalInformation.email}
            disabled
          />
        </Grid2>
        <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
          <TextField
            label="Sexo"
            variant="standard"
            value={props.data.personalInformation.sex ? "Hombre" : "Mujer"}
            disabled
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default PersonalInformation;

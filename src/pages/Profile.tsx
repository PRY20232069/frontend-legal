import React, { useState } from "react";
import dataJson from "../shared/utils/mock/profile.json";
import { IProfile } from "../interfaces/IProfile";
import PersonalInformation from "../components/profile/PersonalInformation";
import Membership from "../components/profile/Membership";
import Plans from "../components/profile/Plans";
import { DrawerHeader } from "../components/shared/Material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Profile = () => {
  const [data] = useState<IProfile>(dataJson);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Box component="main" sx={{ flexGrow: 1, mt: 2, ml: 8 }}>
      <DrawerHeader />
      <Typography
        variant="h5"
        color="primary"
        sx={{ mt: 2, fontWeight: "bold" }}
      >
        Mi perfil
      </Typography>
      <PersonalInformation data={data} />
      <Membership data={data} setOpen={setOpenModal} />
      <Plans data={data} open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};

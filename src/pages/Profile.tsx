import React, { useState } from "react";
import dataJson from "../shared/utils/mock/profile.json";
import { IProfile } from "../interfaces/IProfile";
import PersonalInformation from "../components/profile/PersonalInformation";
import Membership from "../components/profile/Membership";
import Plans from "../components/profile/Plans";
import { DrawerHeader } from "../components/shared/Material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export const Profile = () => {
  const [data] = useState<IProfile>(dataJson);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Box component="main" sx={{ flexGrow: 1, m: 2 }}>
      <DrawerHeader />
      <PersonalInformation data={data} />
      <Divider />
      <Membership data={data} setOpen={setOpenModal} />
      <Plans data={data} open={openModal} setOpen={setOpenModal} />
    </Box>
  );
};
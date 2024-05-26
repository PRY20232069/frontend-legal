import React, { useEffect, useState } from "react";
import dataJson from "../shared/utils/mock/profile.json";
import { IProfile } from "../interfaces/IProfile";
import PersonalInformation from "../components/profile/PersonalInformation";
import Membership from "../components/profile/Membership";
import Plans from "../components/profile/Plans";
import { DrawerHeader } from "../components/shared/Material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ProfilesApiService } from "../services/ProfilesApiService";
import LoadingComponent from "../components/shared/widgets/LoadingComponent";

export const Profile = () => {
  const [data, setData] = useState<IProfile>();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getProfile = async (): Promise<any> => {
    setLoading(true);
    await ProfilesApiService.getProfile()
      .then((profile) => {
        var temp: IProfile = {
          personalInformation: {
            id: profile.id,
            name: profile.name,
            lastName: profile.last_name,
            email: profile.email,
            sex: profile.gender,
            birthday: profile.birth_date,
            document: profile.document_number,
          },
          membership: {
            plan: {
              planId: dataJson.plans[0].planId,
              planName: dataJson.plans[0].planName,
              description: dataJson.plans[0].description,
              limit: dataJson.plans[0].limit,
            },
            usage: dataJson.membership.usage,
          },
          plans: dataJson.plans,
        };
        setData(temp);
      })
      .catch((error) => {
        console.error("Error while getting profile", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    }
  }, []);

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
      {data && (
        <>
          <PersonalInformation data={data} setLoading={setLoading} />
          <Membership data={data} setOpen={setOpenModal} />
          <Plans data={data} open={openModal} setOpen={setOpenModal} />
        </>
      )}
      {loading && <LoadingComponent />}
    </Box>
  );
};

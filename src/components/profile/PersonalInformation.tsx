import React, { useEffect, useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { IPersonalInformation, IProfile } from "../../interfaces/IProfile";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CustomTextField } from "../shared/widgets/Mui/Input";
import { CustomButton } from "../shared/widgets/Mui/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import FormHelperText from "@mui/material/FormHelperText";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../../components/shared/widgets/ToastDisplay";
import { ProfilesApiService } from "../../services/ProfilesApiService";
import { SaveProfileResource } from "../../resources/requests/SaveProfileResource";
import MenuItem from "@mui/material/MenuItem";
import LoadingComponent from "../shared/widgets/LoadingComponent";

const updateProfile = async (saveProfileResource: SaveProfileResource) => {
  try {
    const response = await ProfilesApiService.updateProfile(
      saveProfileResource
    );
    if (response.status === 200) {
      toast.success(
        <ToastDisplay
          title="Cambios aplicados"
          message="Los cambios se han aplicado correctamente"
        />
      );
    }
  } catch (error) {
    toast.error(
      <ToastDisplay
        title="Error al aplicar cambios"
        message="Ocurrió un error al aplicar los cambios"
      />
    );
  }
};

interface IPersonalInfo {
  data: IProfile;
  setLoading: (state: boolean) => void;
}

const PersonalInformation: React.FC<IPersonalInfo> = (props) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [FCError, setFCError] = useState("");
  const [DNIError, setDNIError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [info, setInfo] = useState<IPersonalInformation>(
    props.data.personalInformation
  );
  const [backUpinfo, setbackUpinfo] = useState<IPersonalInformation>(
    props.data.personalInformation
  );

  const handleChange = (
    fieldName: keyof IPersonalInformation,
    value: string
  ) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.setLoading(true);

    let error = false;

    if (
      !info.birthday ||
      !info.document ||
      !info.email ||
      !info.lastName ||
      !info.name ||
      nameError ||
      lastNameError ||
      FCError ||
      DNIError
    ) {
      toast.error(
        <ToastDisplay
          title="Verifica la información proporcionada"
          message=""
        />
      );
      props.setLoading(false);
      error = true;
      return;
    }

    if (emailError) {
      error = true;
      toast.error(
        <ToastDisplay
          title="El correo se ecuentra en un formato incorrecto"
          message=""
        />
      );
      props.setLoading(false);
    }

    if (checkData(backUpinfo, info)) {
      error = true;
      toast.error(
        <ToastDisplay
          title="No se aplicaron los cambios debido a que no se encontraron cambios"
          message=""
        />
      );
      props.setLoading(false);
    }

    if (!error) {
      setEdit(false);
      // setbackUpinfo({ ...info });
      console.log(info);
      updateProfile({
        name: info.name,
        last_name: info.lastName,
        gender: info.sex,
        birth_date: new Date("1995-12-17"),
        document_number: info.document.toString(),
        district: "",
        region: "",
      })
        .then(() => {
          toast.success(
            <ToastDisplay
              title="Cambios aplicados"
              message="Los cambios se han aplicado correctamente"
            />
          );
        })
        .catch((error) => {
          toast.error(
            <ToastDisplay
              title="Error al aplicar cambios"
              message="Ocurrió un error al aplicar los cambios"
            />
          );
          console.error("Error while getting profile", error);
        })
        .finally(() => {
          props.setLoading(false);
        });
    }
  };

  const checkData = (obj1: any, obj2: any): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  };

  const disableEdit = () => {
    setInfo(backUpinfo);
    setEdit(false);
  };

  useEffect(() => {
    const newEmail: string = info.email.toString();
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("El email no es válido");
    } else {
      setEmailError("");
    }
  }, [info.email]);

  useEffect(() => {
    setNameError(info.name.length !== 0 ? "" : "Campo vacío");
    setLastNameError(info.lastName.length !== 0 ? "" : "Campo vacío");
    setFCError(info.birthday.length !== 0 ? "" : "Campo vacío");
    setDNIError(info.document.toString().length !== 0 ? "" : "Campo vacío");
  }, [info]);

  return (
    <Box
      sx={{
        my: 2,
        border: "#EBF0EC 2px solid",
        p: 3,
        mr: 5,
        borderRadius: "4px",
        maxWidth: 1000,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid2 container>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography
              variant="h6"
              color="primary"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              Datos personales
            </Typography>
          </Grid2>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Grid2 xs={12} sx={{ textAlign: "right" }}>
              {!edit ? (
                <CustomButton
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "40%",
                    backgroundColor: "#E1F9F7",
                    color: "#193A32",
                  }}
                  fullWidth
                  onClick={() => setEdit(true)}
                >
                  <>
                    <IconButton size="small">
                      <EditIcon fontSize="inherit" color="primary" />
                    </IconButton>
                    Editar
                  </>
                </CustomButton>
              ) : (
                <IconButton size="large" onClick={disableEdit}>
                  <CloseIcon fontSize="inherit" color="primary" />
                </IconButton>
              )}
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Nombre
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              value={info.name}
              onChange={(e) => handleChange("name", e.target.value)}
              fullWidth
              sx={{
                width: "80%",
                "& .MuiInputBase-input": {
                  color: nameError ? "red" : "#668D84",
                  border: nameError ? "red 1px solid" : "#FBFAFB 1px solid",
                },
              }}
              disabled={!edit}
              error={!!nameError}
            />
            <FormHelperText error>{nameError}</FormHelperText>
          </Grid2>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Apellidos
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              value={info.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
              sx={{
                width: "80%",
                "& .MuiInputBase-input": {
                  color: lastNameError ? "red" : "#668D84",
                  border: lastNameError ? "red 1px solid" : "#FBFAFB 1px solid",
                },
              }}
              disabled={!edit}
              error={!!lastNameError}
            />
            <FormHelperText error>{lastNameError}</FormHelperText>
          </Grid2>
        </Grid2>
        <Grid2 container>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Correo
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              value={info.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
              sx={{
                width: "80%",
                "& .MuiInputBase-input": {
                  color: emailError ? "red" : "#668D84",
                  border: emailError ? "red 1px solid" : "#FBFAFB 1px solid",
                },
              }}
              disabled={!edit}
              error={!!emailError}
            />
            <FormHelperText error>{emailError}</FormHelperText>
          </Grid2>
          <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Documento de Identidad
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              value={info.document}
              onChange={(e) => handleChange("document", e.target.value)}
              fullWidth
              sx={{
                width: "80%",
                "& .MuiInputBase-input": {
                  color: DNIError ? "red" : "#668D84",
                  border: DNIError ? "red 1px solid" : "#FBFAFB 1px solid",
                },
              }}
              disabled={!edit}
              error={!!DNIError}
            />
            <FormHelperText error>{DNIError}</FormHelperText>
          </Grid2>
        </Grid2>
        <Grid2 container>
          {/* <Grid2 xs={12} md={6} sx={{ mb: 2 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Fecha de cumpleaños
            </Typography>
            <CustomTextField
              variant="outlined"
              margin="normal"
              value={info.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
              fullWidth
              sx={{
                width: "80%",
                "& .MuiInputBase-input": {
                  color: FCError ? "red" : "#668D84",
                  border: FCError ? "red 1px solid" : "#FBFAFB 1px solid",
                },
              }}
              disabled={true}
            />

            <FormHelperText error>{FCError}</FormHelperText>
          </Grid2> */}
          <Grid2 xs={12} md={6} sx={{ mb: 4 }}>
            <Typography color="primary" sx={{ mt: 2, fontWeight: "bold" }}>
              Sexo
            </Typography>
            <CustomTextField
              select
              variant="outlined"
              margin="normal"
              value={info.sex}
              onChange={(e) => handleChange("sex", e.target.value)}
              fullWidth
              sx={{ width: "80%" }}
              disabled={!edit}
            >
              <MenuItem value="male">
                <em>Masculino</em>
              </MenuItem>
              <MenuItem value="female">
                <em>Femenino</em>
              </MenuItem>
            </CustomTextField>
          </Grid2>
        </Grid2>
        {edit && (
          <Grid2 xs={12} sx={{ textAlign: "start" }}>
            <CustomButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: "30%", height: "40px" }}
              fullWidth
            >
              Guardar
            </CustomButton>
          </Grid2>
        )}
      </form>
      <Toaster />
    </Box>
  );
};

export default PersonalInformation;

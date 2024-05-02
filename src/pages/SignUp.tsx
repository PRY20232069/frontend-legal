import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UsersApiService } from "../services/UsersApiService";
import { UserResource } from "../resources/responses/UserResource";
import { SaveUserResource } from "../resources/requests/SaveUserResource";
import { SaveProfileResource } from "../resources/requests/SaveProfileResource";
import { ProfileResource } from "../resources/responses/ProfileResource";
import { ProfilesApiService } from "../services/ProfilesApiService";
import { DrawerHeader } from "../components/shared/Material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { FormHelperText, Box, Typography } from "@mui/material";
import Logo from "../assets/svgs/logo.svg";
import { CustomButton } from "../components/shared/widgets/Mui/Button";
import { CustomTextField } from "../components/shared/widgets/Mui/Input";
import Footer from "../components/shared/layout/footer/Footer";
import LoadingComponent from "../components/shared/widgets/LoadingComponent";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../components/shared/widgets/ToastDisplay";

const registerUser = async (email: string, password: string): Promise<any> => {
  try {
    const saveUserResource: SaveUserResource = { email, password };
    const userResource: UserResource = await UsersApiService.registerUser(
      saveUserResource
    );

    localStorage.setItem("token", userResource.token);

    return userResource;
  } catch (error) {
    console.error("Error during registration", error);
  }
};

const registerProfile = async (): Promise<any> => {
  try {
    const saveProfileResource: SaveProfileResource = {
      name: "string",
      last_name: "string",
      birth_date: new Date(),
      district: "string",
      region: "string",
    };
    const profileResource: ProfileResource =
      await ProfilesApiService.createProfile(saveProfileResource);

    return profileResource;
  } catch (error) {
    console.error("Error during profile creation", error);
  }
};

const getProfile = async (): Promise<any> => {
  try {
    const profileResource: ProfileResource =
      await ProfilesApiService.getProfile();
    return profileResource;
  } catch (error) {
    console.error("Error while getting profile", error);
  }
};

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Validación del email
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setEmailError("El email no es válido");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Validación de la contraseña
    if (newPassword.length < 8) {
      setPasswordError("Mínimo 8 caracteres");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let error = false;
    setLoading(true);

    if (!email) {
      toast.error(
        <ToastDisplay title="No has ingresado el correo" message="" />
      );
      setEmailError("El correo es obligatorio");
      setLoading(false);
      error = true;
    }
    if (!password) {
      toast.error(
        <ToastDisplay title="No has ingresado la contraseña" message="" />
      );
      setPasswordError("La contraseña es obligatoria");
      setLoading(false);
      error = true;
    }

    if (!emailError && !passwordError && !error) {
      const userResource = await registerUser(email, password);
      if (!userResource || !userResource.id || !userResource.token) {
        setLoading(false);
        return; // something was wrong
      }

      const existingProfile = await getProfile();
      if (existingProfile && existingProfile.id) {
        navigate("/");
        window.location.reload();
        return;
      }

      const profileResource = await registerProfile();
      if (!profileResource || !profileResource.id) {
        setLoading(false);
        return; // something was wrong
      }

      setLoading(false);
      navigate("/"); // ideal scenario
      window.location.reload();
    }
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          width: "100%",
          height: "95vh",
        }}
      >
        <DrawerHeader />
        <Grid2
          container
          sx={{
            width: "100%",
            height: "80vh",
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <form className="login-form" onSubmit={handleSubmit}>
            <img src={Logo} />

            <Typography color="primary" sx={{ mt: 2 }}>
              Correo
            </Typography>
            <div className="form-group">
              <CustomTextField
                placeholder="user@mail.com"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
              />
              <FormHelperText error>{emailError}</FormHelperText>
            </div>
            <Typography color="primary" sx={{ mt: 2 }}>
              Contraseña
            </Typography>
            <div className="form-group">
              <CustomTextField
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={handlePasswordChange}
                error={!!passwordError}
              />
              <FormHelperText error>{passwordError}</FormHelperText>
            </div>
            <div className="form-group">
              <CustomButton
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Registrarse
              </CustomButton>
            </div>
            <div className="form-group" style={{ textAlign: "center" }}>
              <Link to="/sign-in" style={{ textDecoration: "none" }}>
                <Typography variant="body1" color="#668D84" sx={{ mb: 2 }}>
                  ¿Ya tienes una cuenta?
                </Typography>
              </Link>
            </div>
          </form>
        </Grid2>
      </Box>
      <Footer />
      {loading && <LoadingComponent />}
      <Toaster />
    </>
  );
};

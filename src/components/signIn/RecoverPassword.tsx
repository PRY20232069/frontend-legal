import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import { CustomTextField } from "../shared/widgets/Mui/Input";
import { CustomButton } from "../shared/widgets/Mui/Button";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../shared/widgets/ToastDisplay";
import { RecoverPasswordResource } from "../../resources/requests/RecoverPasswordResource";
import { UserResource } from "../../resources/responses/UserResource";
import { UsersApiService } from "../../services/UsersApiService";
import LoadingComponent from "../shared/widgets/LoadingComponent";

const recoverPassword = async (email: string): Promise<any> => {
  try {
    const recoverPasswordResource: RecoverPasswordResource = { email };
    const userResource: UserResource = await UsersApiService.recoverPassword(
      recoverPasswordResource
    );
    return userResource;
  } catch (error) {
    console.error("Error during authentication", error);
  }
};

interface IRecoverPassword {
  open: boolean;
  setOpen: (state: boolean) => void;
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string;
  setEmailSended: (state: boolean) => void;
}

const RecoverPassword: React.FC<IRecoverPassword> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleRecoverPassword = () => {
    setLoading(true);
    recoverPassword(props.email)
      .then(() => {
        toast.success(
          <ToastDisplay
            title="Correo enviado"
            message="Revisa tu bandeja de entrada, spam o correo no deseado."
          />
        );
      })
      .finally(() => {
        setLoading(false);
        props.setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        onClose={() => props.setOpen(false)}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!props.email) {
              toast.error(
                <ToastDisplay title="No has ingresado el correo" message="" />
              );
            } else {
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;

              console.log(email);
              props.setEmailSended(true);
              props.setOpen(false);
            }
          },
        }}
      >
        <DialogTitle>Recuperar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Escribe tu correo electrónico registrado para poder enviarte una
            nueva contraseña
          </DialogContentText>
          <CustomTextField
            placeholder="user@mail.com"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={props.email}
            onChange={props.handleEmailChange}
            error={!!props.emailError}
          />
          <FormHelperText error>{props.emailError}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
          <CustomButton
            variant="contained"
            color="primary"
            onClick={handleRecoverPassword}
          >
            Enviar
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Toaster />
      {loading && <LoadingComponent />}
    </React.Fragment>
  );
};

export default RecoverPassword;

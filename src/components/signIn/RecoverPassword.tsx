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

interface IRecoverPassword {
  open: boolean;
  setOpen: (state: boolean) => void;
  email: string;
  handleEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string;
  setEmailSended: (state: boolean) => void;
}

const RecoverPassword: React.FC<IRecoverPassword> = (props) => {
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
          />
          <FormHelperText error>{props.emailError}</FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
          <CustomButton variant="contained" color="primary" type="submit">
            Enviar
          </CustomButton>
        </DialogActions>
      </Dialog>
      <Toaster />
    </React.Fragment>
  );
};

export default RecoverPassword;

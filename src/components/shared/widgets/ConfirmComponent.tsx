import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { CustomButton } from "./Mui/Button";
import LoadingComponent from "./LoadingComponent";

interface IConfirmComponent {
  open: boolean;
  text: string;
  subText?: string;
  setOpen: (state: boolean) => void;
  loading: boolean;
  handleClick: () => void;
}

const ConfirmComponent: React.FC<IConfirmComponent> = (props) => {
  return (
    <>
      <React.Fragment>
        <Dialog open={props.open} onClose={() => props.setOpen(false)}>
          <DialogTitle sx={{ fontWeight: "bold" }}>{props.text}</DialogTitle>
          {props.subText && (
            <DialogContent>
              <DialogContentText sx={{ textAlign: "center" }}>
                {props.subText}
              </DialogContentText>
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={() => props.setOpen(false)}>Cancelar</Button>
            <CustomButton
              variant="contained"
              color="primary"
              onClick={props.handleClick}
            >
              Confirmar
            </CustomButton>
          </DialogActions>
        </Dialog>
        {props.loading && <LoadingComponent />}
      </React.Fragment>
    </>
  );
};

export default ConfirmComponent;

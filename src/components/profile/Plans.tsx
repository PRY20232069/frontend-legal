import React from "react";
import { IProfile } from "../../interfaces/IProfile";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { CustomButton } from "../shared/widgets/Mui/Button";

interface IPlans {
  data: IProfile;
  open: boolean;
  setOpen: (state: boolean) => void;
}

const Plans: React.FC<IPlans> = (props) => {
  return (
    <Dialog
      fullWidth
      maxWidth="lg"
      onClose={() => props.setOpen(!props.open)}
      open={props.open}
    >
      <DialogTitle>
        <Typography
          variant="h5"
          color="primary"
          gutterBottom
          sx={{ fontWeight: "bold", ml: 2, mt: 2 }}
        >
          Mejora tu plan
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mb: 1 }}>
        <Grid2 container sx={{ justifyContent: "center" }}>
          {props.data.plans.map((p, i) => {
            const whatsappLink = `https://api.whatsapp.com/send?phone=51990998136&text=Hola%20soy%20${props.data.personalInformation.name},%20mi%20%20código%20es%20${props.data.personalInformation.id}%20y%20deseo%20adquirir%20el%20plan%20${p.planName}.`;
            return (
              <Grid2 key={i} xs={12} md={3} sx={{ mb: 2, mr: 2 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="primary"
                      gutterBottom
                      sx={{ fontWeight: "bold" }}
                    >
                      {p.planName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {p.description}
                    </Typography>
                    <br />
                    <Typography variant="body2" color="text.secondary">
                      {`Limite: ${p.limit}`}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <CustomButton
                      variant="contained"
                      color="primary"
                      // sx={{ width: "80%" }}
                      size="small"
                      fullWidth
                      onClick={() => window.open(whatsappLink, "_blank")}
                    >
                      Adquirir
                    </CustomButton>
                  </CardActions>
                </Card>
              </Grid2>
            );
          })}
        </Grid2>
      </DialogContent>
    </Dialog>
  );
};

export default Plans;

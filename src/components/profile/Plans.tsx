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

interface IPlans {
  data: IProfile;
  open: boolean;
  setOpen: (state: boolean) => void;
}

const Plans: React.FC<IPlans> = (props) => {
  return (
    <Dialog
      fullWidth
      onClose={() => props.setOpen(!props.open)}
      open={props.open}
    >
      <DialogTitle sx={{ textAlign: "center" }}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          Planes
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid2 container sx={{ justifyContent: "center" }}>
          {props.data.plans.map((p, i) => {
            const whatsappLink = `https://api.whatsapp.com/send?phone=51990998136&text=Hola%20soy%20${props.data.personalInformation.name},%20mi%20%20código%20es%20${props.data.personalInformation.id}%20y%20deseo%20adquirir%20el%20plan%20${p.planName}.`;
            return (
              <Grid2 key={i} xs={12} md={4} sx={{ mb: 2, mr: 2 }}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="h5"
                      color="text.secondary"
                      gutterBottom
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
                    <Button
                      onClick={() => window.open(whatsappLink, "_blank")}
                      size="small"
                    >
                      Adquirir
                    </Button>
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

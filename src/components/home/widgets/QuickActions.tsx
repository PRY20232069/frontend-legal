import { Link, To, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import { SectionTitle } from "./SectionTitle";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export const QuickActions = () => {
  const navigate = useNavigate();

  //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files ? event.target.files[0] : null;

  //     if (file) {
  //       navigate(`/upload-contract`, { state: { fileLoaded: file } });
  //     }
  //   };

  return (
    <div>
      <Typography variant="body1" color="gray" sx={{ mt: 4, mb: 2 }}>
        Acciones rápidas
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2, ml: 1 }}>
        <QuickAction
          name="Subir contrato"
          path={"/upload-contract"}
          icon={<CloudUploadIcon sx={{ color: "#193A32" }} />}
          color="#193A32"
          bgColor="#E1F9F7"
          mr={8}
        />
        <QuickAction
          name="Ranking"
          path={"/ranking"}
          icon={<BarChartIcon color="primary" />}
          color="#191C3A"
          bgColor="#E1EBF9"
          mr={0}
        />
      </Grid>
    </div>
  );
};

interface IQuickAction {
  name: String;
  path: To;
  icon: any;
  bgColor: any;
  color: any;
  mr: number;
}

const QuickAction: React.FC<IQuickAction> = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.bgColor,
        padding: "12px",
        marginRight: props.mr,
        width: "150px",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <Link to={props.path} style={{ textDecoration: "none" }}>
        <div>{props.icon}</div>
        <div style={{ color: props.color }}>{props.name}</div>
      </Link>
    </div>
  );
};

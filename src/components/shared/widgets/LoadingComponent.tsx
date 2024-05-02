import { CircularProgress } from "@mui/material";
import Modal from "@mui/material/Modal";

interface data {
  text?: string;
}

const LoadingComponent = (props: data) => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div
        style={{
          textAlign: "center",
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <CircularProgress color="secondary" />
        <div className="sr-only" style={{ color: "#fff", fontWeight: "bold" }}>
          Cargando...
        </div>
        {props.text && <p className="text-center mt-3">{props.text}</p>}
      </div>
    </Modal>
  );
};

export default LoadingComponent;

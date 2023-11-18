import Modal from "@mui/material/Modal";

interface data {
  text?: string;
}

const LoadingComponent = (props: data) => {
  return (
    <Modal open={true} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div
        className="text-center"
        style={{
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
        {props.text && <p className="text-center mt-3">{props.text}</p>}
      </div>
    </Modal>
  );
};

export default LoadingComponent;

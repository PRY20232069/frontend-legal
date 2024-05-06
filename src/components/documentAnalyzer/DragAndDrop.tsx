import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Typography from "@mui/material/Typography";

interface IDragAndDrop {
  onFileChange: (event: File) => void;
}

const DragAndDrop: React.FC<IDragAndDrop> = (props) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      props.onFileChange(acceptedFiles[0]);
    },
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Suelta el archivo</p>
      ) : (
        <div style={{ textAlign: "center", alignItems: "center" }}>
          <CloudUploadIcon sx={{ color: "#193A32" }} />
          <Typography variant="body1" color="#193A32">
            Haz click aquí o arrastra un archivo
          </Typography>
        </div>
      )}
    </div>
  );
};

export default DragAndDrop;

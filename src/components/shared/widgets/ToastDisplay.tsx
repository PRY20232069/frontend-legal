import React from "react";

interface IToastDisplay {
  title: string;
  message: string;
}

const ToastDisplay: React.FC<IToastDisplay> = (props) => {
  return (
    <div>
      <h5 style={{ fontWeight: "bold" }}>{props.title}</h5>
      <p>{props.message}</p>
    </div>
  );
};

export default ToastDisplay;

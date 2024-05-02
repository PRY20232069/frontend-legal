import React from "react";

interface IToastDisplay {
  title: string;
  message: string;
}

const ToastDisplay: React.FC<IToastDisplay> = (props) => {
  return (
    <div>
      <h4 style={{ fontWeight: "bold" }}>{props.title}</h4>
      <p>{props.message}</p>
    </div>
  );
};

export default ToastDisplay;

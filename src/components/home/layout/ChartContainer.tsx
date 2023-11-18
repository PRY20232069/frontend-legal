import React, { ReactNode } from "react";

interface ChartContainerProps {
  children: ReactNode;
  width?: number;
  height?: number;
  resizable?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export function ChartContainer({ children, width = 600, height = 300, resizable = true, style = {}, className = "" }: ChartContainerProps) {
  return (
    <div style={{ marginLeft: 20 }}>
      <div style={{ display: "inline-block", width: "auto", background: "white", padding: ".5rem", borderRadius: "0.5rem", boxShadow: "0 30px 40px rgba(0,0,0,.1)", ...style, }} >
        <div style={{ width: `${width}px`, height: `${height}px`, }} className={className}>
          {children}
        </div>
      </div>
    </div>
  );
}

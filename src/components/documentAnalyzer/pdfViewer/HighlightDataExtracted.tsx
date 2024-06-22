import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Monto Solicitado", value: 80000 },
  { name: "Seguro de Desgravamen", value: 324 },
  { name: "Pago Total de Intereses", value: 33868.72 },
];

const pieData = [
  { name: "Monto Solicitado", value: 80000 },
  { name: "Seguro de Desgravamen", value: 324 },
  { name: "Pago Total de Intereses", value: 33868.72 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const HighLightDataExtracted = () => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{ backgroundColor: "#E6FFF8" }}
      >
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Detalles del contrato
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ backgroundColor: "#F4FFFC" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: "16px" }}
        >
          Resumen del Contrato
        </Typography>
        {/* Gráfico de Barras */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          Distribución de Costos
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
        Gráfico Circular
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: "8px", marginTop: "16px" }}
        >
          Proporción de Costos
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        {/* Gráfico de Líneas */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: "8px", marginTop: "16px" }}
        >
          Evolución del Pago de Intereses
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default HighLightDataExtracted;

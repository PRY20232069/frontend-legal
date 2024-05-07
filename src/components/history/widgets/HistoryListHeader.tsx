import styled from "@emotion/styled";

const ListHeaderContainer = styled("li")(({ theme }) => ({
  display: "flex",
  backgroundColor: "#FCFCFC",
  borderRadius: "10px 10px 0 0",
  padding: "15px",
  margin: "6px",
  fontWeight: "bold",
  color: "#193A32",
}));

export const HistoryListHeader = () => {
  return (
    <ListHeaderContainer>
      <div style={{ flex: 3 }}>Título</div>
      <div style={{ flex: 1, textAlign: "center" }}>Fecha de subida</div>
      <div style={{ flex: 1, textAlign: "center" }}>Observaciones</div>
      <div style={{ width: 46 }}></div>
    </ListHeaderContainer>
  );
};

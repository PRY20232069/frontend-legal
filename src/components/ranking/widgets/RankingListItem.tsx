import React from "react";
import styled from "@emotion/styled";
import { BankResource } from "../../../resources/responses/BankResource";
import { Avatar } from "@mui/material";

type Props = {
  data: BankResource;
};

const ListItemContainer = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  margin: "3px 6px",
  padding: "8px 15px",
  "&:last-child": {
    borderRadius: "0 0 10px 10px",
    margin: "3px 6px 6px",
  },
}));

export const RankingListItem: React.FC<Props> = ({ data }) => {
  return (
    <ListItemContainer>
      <div style={{ flex: 1 }}>
        <Avatar alt="icon" src={data.logo_url} />
      </div>
      <div style={{ flex: 3 }}>{data.name}</div>
      <div style={{ flex: 2 }}>
        Cantidad de contratos: {data.contracts_count}
      </div>
    </ListItemContainer>
  );
};

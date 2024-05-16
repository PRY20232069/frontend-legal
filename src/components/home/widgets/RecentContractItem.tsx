import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ContractResource } from "../../../resources/responses/ContractResource";
import { SaveContractResource } from "../../../resources/requests/SaveContractResource";
import { ContractsApiService } from "../../../services/ContractsApiService";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const markContractAsFavorite = async (
  contract: ContractResource
): Promise<any> => {
  try {
    let saveContractResource: SaveContractResource = {
      name: contract.name,
      bank_id: contract.bank_id,
      favorite: !contract.favorite,
    };
    const contractResource: ContractResource =
      await ContractsApiService.updateContract(
        contract.id,
        saveContractResource
      );
    return contractResource;
  } catch (error) {
    console.error("Error during file upload", error);
  }
};

type Props = {
  data: ContractResource;
  onUpdate: (data: ContractResource) => void;
};

export const RecentContractItem: React.FC<Props> = ({ data, onUpdate }) => {
  const navigate = useNavigate();

  const updateData = useCallback(() => {
    const updatedData: ContractResource = { ...data, favorite: !data.favorite };
    onUpdate(updatedData);
  }, [data, onUpdate]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    updateData();
    markContractAsFavorite(data);
  };

  const formattedDate = (_date: Date) => {
    const date = new Date(_date);
    const day = date.getDate().toString().padStart(2, "0"); // Asegura que el día siempre tenga dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript empiezan en 0, por lo que debes sumar 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <TableRow
      hover
      onClick={() => {
        navigate(`/document-analyzer/${data.id}`);
      }}
      key={data.id}
      sx={{
        cursor: "pointer",
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell sx={{ color: "#0D2B23" }}>{data.name}</TableCell>
      <TableCell align="center" sx={{ color: "#0D2B23" }}>
        {formattedDate(data.uploaded_date)}
      </TableCell>
      <TableCell align="center" sx={{ color: "#0D2B23" }}>
        5
      </TableCell>
      <TableCell align="center" sx={{ color: "#0D2B23" }}>
        <IconButton color="primary" onClick={handleClick}>
          {data.favorite ? (
            <StarIcon sx={{ color: "#0D2B23" }} />
          ) : (
            <StarBorderIcon sx={{ color: "#0D2B23" }} />
          )}
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

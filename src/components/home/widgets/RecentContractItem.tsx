import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { ContractResource } from "../../../resources/responses/ContractResource";
import { SaveContractResource } from "../../../resources/requests/SaveContractResource";
import { ContractsApiService } from "../../../services/ContractsApiService";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ConfirmComponent from "../../shared/widgets/ConfirmComponent";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../../shared/widgets/ToastDisplay";

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
    console.error("Error during c", error);
  }
};

const deleteContract = async (contractId: number): Promise<any> => {
  try {
    await ContractsApiService.deleteContract(contractId);
  } catch (error) {
    console.error("Error during contract deletion", error);
  }
};

type Props = {
  data: ContractResource;
  onUpdate: (data: ContractResource) => void;
  onRemove: (id: number) => void;
};

export const RecentContractItem: React.FC<Props> = ({
  data,
  onUpdate,
  onRemove,
}) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const updateData = useCallback(() => {
    const updatedData: ContractResource = { ...data, favorite: !data.favorite };
    onUpdate(updatedData);
  }, [data, onUpdate]);

  const handleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    updateData();
    markContractAsFavorite(data);
  };

  const handleDeleteConfirmation = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenConfirmDelete(true);
  };

  const handleDelete = () => {
    setLoading(true);
    deleteContract(data.id)
      .then(() => {
        onRemove(data.id);
        toast.success(
          <ToastDisplay title="Contrato eliminado correctamente" message="" />
        );
      })
      .catch(() => {
        toast.error(
          <ToastDisplay
            title="Error. El contrato no logró eliminarse correctamente"
            message=""
          />
        );
      })
      .finally(() => {
        setLoading(false);
        setOpenConfirmDelete(false);
      });
  };

  const formattedDate = (_date: Date) => {
    const date = new Date(_date);
    const day = date.getDate().toString().padStart(2, "0"); // Asegura que el día siempre tenga dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Los meses en JavaScript empiezan en 0, por lo que debes sumar 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
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
        <TableCell align="center" sx={{ color: "#0D2B23", display: "flex" }}>
          <IconButton color="primary" onClick={handleFavorite}>
            {data.favorite ? (
              <StarIcon sx={{ color: "#0D2B23" }} />
            ) : (
              <StarBorderIcon sx={{ color: "#0D2B23" }} />
            )}
          </IconButton>
          <IconButton color="primary" onClick={handleDeleteConfirmation}>
            <DeleteOutlinedIcon sx={{ color: "#0D2B23" }} />
          </IconButton>
        </TableCell>
      </TableRow>
      <ConfirmComponent
        open={openConfirmDelete}
        text={"¿Estas seguro que deseas eliminar este contrato?"}
        subText={
          "Debes de tener en cuenta, que esta acción no se puede deshacer."
        }
        setOpen={setOpenConfirmDelete}
        loading={loading}
        handleClick={handleDelete}
      />
      <Toaster />
    </>
  );
};

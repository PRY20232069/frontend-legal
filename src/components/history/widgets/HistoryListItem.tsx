import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import styled from "@emotion/styled";
import { ContractResource } from "../../../resources/responses/ContractResource";
import { SaveContractResource } from "../../../resources/requests/SaveContractResource";
import { ContractsApiService } from "../../../services/ContractsApiService";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
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
    console.error("Error during file upload", error);
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

const ListItemContainer = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "white",
  margin: "3px 6px",
  "&:last-child": {
    borderRadius: "0 0 10px 10px",
    margin: "3px 6px 6px",
  },
  color: "#193A32",
}));

const ListItemLink = (props: any) => {
  const navigate = useNavigate();

  return (
    <ListItemButton
      style={{ padding: "8px 15px", width: "100%", height: "100%" }}
      onClick={() => navigate(props.to)}
    >
      {props.children}
    </ListItemButton>
  );
};

export const HistoryListItem: React.FC<Props> = ({
  data,
  onUpdate,
  onRemove,
}) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const updateData = useCallback(() => {
    const updatedData: ContractResource = { ...data, favorite: !data.favorite };
    onUpdate(updatedData);
  }, [data, onUpdate]);

  const handleClick = (event: React.MouseEvent) => {
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

  const handleCancel = () => {
    setOpenConfirmDelete(false);
    toast.error(
      <ToastDisplay
        title="Eliminación cancelada"
        message="El contrato no se eliminó"
      />
    );
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
      <ListItemContainer>
        <ListItemLink to={`/document-analyzer/${data.id}`}>
          <div style={{ flex: 3, alignItems: "center", display: "flex" }}>
            <TextSnippetOutlinedIcon sx={{ color: "#0D2B23" }} />
            {data.name}
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            {formattedDate(data.uploaded_date)}
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            5 {/*data.num_observations*/}
          </div>
          <div style={{ display: "flex" }}>
            <IconButton color="primary" onClick={handleClick}>
              {data.favorite ? (
                <StarIcon sx={{ color: "#0D2B23" }} />
              ) : (
                <StarBorderIcon sx={{ color: "#0D2B23" }} />
              )}
            </IconButton>
            <IconButton color="primary" onClick={handleDeleteConfirmation}>
              <DeleteOutlinedIcon sx={{ color: "#0D2B23" }} />
            </IconButton>
          </div>
        </ListItemLink>
      </ListItemContainer>
      <ConfirmComponent
        open={openConfirmDelete}
        text={"¿Estas seguro que deseas eliminar este contrato?"}
        subText={
          "Debes de tener en cuenta, que esta acción no se puede deshacer."
        }
        setOpen={setOpenConfirmDelete}
        loading={loading}
        handleClick={handleDelete}
        handleCancel={handleCancel}
      />
      <Toaster />
    </>
  );
};

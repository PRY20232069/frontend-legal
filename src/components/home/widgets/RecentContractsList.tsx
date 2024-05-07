import React, { useCallback, useEffect, useState } from "react";
import { ContractResource } from "../../../resources/responses/ContractResource";
import { ContractsApiService } from "../../../services/ContractsApiService";
import { RecentContractsListContainer } from "../layout/RecentContractsListContainer";
import { RecentContractItem } from "./RecentContractItem";
import { Typography } from "@mui/material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../../shared/widgets/ToastDisplay";

const getAllContracts = async (): Promise<any> => {
  try {
    const contractResources: ContractResource[] =
      await ContractsApiService.getAllContracts();
    contractResources.sort((a, b) => {
      return (
        new Date(b.uploaded_date).getTime() -
        new Date(a.uploaded_date).getTime()
      );
    });
    contractResources.splice(5, contractResources.length - 5);
    return contractResources;
  } catch (error) {
    console.error("Error during file upload", error);
  }
};

export const RecentContractsList = () => {
  const [contractItems, setContractItems] = useState<ContractResource[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const contractResources = await getAllContracts();
      setContractItems(contractResources || []);
      if (contractResources === undefined) {
        toast.error(
          <ToastDisplay
            title="Error. Los contratos no lograron cargarse correctamente"
            message=""
          />
        );
      }
    };

    fetchContracts();
  }, []);

  const onHistoryItemUpdate = useCallback((updatedData: ContractResource) => {
    setContractItems((prevItems) => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex(
        (item) => item.id === updatedData.id
      );
      updatedItems[index] = updatedData;
      return updatedItems;
    });
  }, []);

  return (
    <div>
      <Typography variant="body1" color="gray" sx={{ mt: 4, mb: 2 }}>
        Contratos recientes
      </Typography>
      <RecentContractsListContainer>
        {contractItems &&
          (contractItems.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#FCFCFC" }}>
                  <TableRow>
                    <TableCell sx={{ color: "#0D2B23", fontWeight: "bold" }}>
                      Nombre del contrato
                    </TableCell>
                    <TableCell sx={{ color: "#0D2B23", fontWeight: "bold" }}>
                      Fecha
                    </TableCell>
                    <TableCell sx={{ color: "#0D2B23", fontWeight: "bold" }}>
                      Observaciones
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contractItems.map((item, index) => (
                    <React.Fragment>
                      <RecentContractItem
                        key={index}
                        data={item}
                        onUpdate={onHistoryItemUpdate}
                      />
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p style={{ marginLeft: 15 }}>
              No se han subido contratos recientemente
            </p>
          ))}
      </RecentContractsListContainer>
      <Toaster />
    </div>
  );
};

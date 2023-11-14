import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Box } from "@mui/material";
import { DrawerHeader } from "../components/shared/Material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import document from "../shared/utils/mock/document_analysis.json";
import Document from "../components/documentAnalyzer/Document";
import Details from "../components/documentAnalyzer/Details";
import IDocumentAnalysis from "../interfaces/IDocumentAnalysis";
import ModalDetails from "../components/documentAnalyzer/ModalDetails";
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";

const getContractById = async (id: number): Promise<any> => {
  try {
      const contractResource: ContractResource = await ContractsApiService.getContractById(id);
      return contractResource;
  } catch (error) {
      console.error('Error during file upload', error);
  }
};

export const DocumentAnalyzer = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<ContractResource | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      if (id !== undefined) {
        const contractData = await getContractById(Number(id));
        setContract(contractData);
      }
    };

    fetchContract();
  }, [id]);

  const [data] = useState<IDocumentAnalysis>(document);
  const [clauseSelected, setClauseSelected] = useState<number>(-1);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [openModalDetails, setOpenModalDetails] = useState<boolean>(false);
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: "grey" }}>
        <DrawerHeader />
        <Grid2 container>
          <Grid2 xs={12} md={8}>
            <Document
              data={data}
              clauseSelected={clauseSelected}
              setClauseSelected={setClauseSelected}
              pageSelected={pageSelected}
              setPageSelected={setPageSelected}
              setOpenModalDetails={setOpenModalDetails}
            />
          </Grid2>
          <Grid2 md={4} sx={{ display: { xs: "none", md: "block" } }}>
            <Details
              data={data}
              clauseSelected={clauseSelected}
              setClauseSelected={setClauseSelected}
            />
          </Grid2>
        </Grid2>
      </Box>
      <ModalDetails
        open={openModalDetails}
        setOpen={setOpenModalDetails}
        data={data}
        clauseSelected={clauseSelected}
        setClauseSelected={setClauseSelected}
      />
    </>
  );
};
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";

import pdfFile from "./CONTRATO_TARJETA_DE_CREDITO.pdf";
import { PDFViewerTEST } from "../components/documentAnalyzer/PDFViewerTEST";

const getContractById = async (id: number): Promise<any> => {
    try {
        const contractResource: ContractResource = await ContractsApiService.getContractById(id);
        return contractResource;
    } catch (error) {
        console.error('Error during file upload', error);
    }
};

export const DocumentAnalyzerTEST = () => {
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

    return (
        <PageContainer>
            <PageTitle>{contract ? contract.name : 'Loading...'}</PageTitle>

            <PDFViewerTEST pdfFile={pdfFile} />
        </PageContainer>
    );
};

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";

import { PDFViewer } from "../components/documentAnalyzer/pdfViewer/PDFViewer";
import { TermsApiService } from "../services/TermsApiService";
import { TermResource } from "../resources/responses/TermResource";

const getContractById = async (id: number): Promise<any> => {
    try {
        const contractResource: ContractResource = await ContractsApiService.getContractById(id);
        console.log(contractResource);
        return contractResource;
    } catch (error) {
        console.error('Error during file upload', error);
    }
};

const getAllTermsByContractId = async (contractId: number): Promise<any> => {
    try {
        const termResources: TermResource[] = await TermsApiService.getAllTermsByContractId(contractId);
        return termResources;
    } catch (error) {
        console.error('Error getting terms', error);
    }
}

export const DocumentAnalyzer = () => {
    const { id } = useParams();
    const [contract, setContract] = useState<ContractResource | null>(null);
    const [terms, setTerms] = useState<TermResource | null>(null);

    useEffect(() => {
        const fetchContract = async () => {
            if (id !== undefined) {
                const contractData = await getContractById(Number(id));
                setContract(contractData);

                if (contractData) {
                    const termsData = await getAllTermsByContractId(contractData.id);
                    setTerms(termsData);
                    console.log(termsData);
                }
            }
        };

        fetchContract();
    }, [id]);

    return (
        <PageContainer>
            <PageTitle>{contract ? contract.name : 'Loading...'}</PageTitle>

            {contract ? (
                contract.file_url ?
                    (<PDFViewer fileUrl={contract.file_url} />) :
                    (<p>Algo salió mal. Por favor vuelva a subir su contrato. Lamentamos el inconveniente :C</p>)
            ) : (
                <p>Loading...</p>
            )}
        </PageContainer>
    );
};

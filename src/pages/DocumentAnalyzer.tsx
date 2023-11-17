import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";

import { PDFViewer } from "../components/documentAnalyzer/pdfViewer/PDFViewer";

const getContractById = async (id: number): Promise<any> => {
    try {
        const contractResource: ContractResource = await ContractsApiService.getContractById(id);
        console.log(contractResource);
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

    return (
        <PageContainer>
            <PageTitle>{contract ? contract.name : 'Loading...'}</PageTitle>

            {contract ? (
                contract.file_url ?
                    (<PDFViewer fileUrl={contract.file_url} />) :
                    (<p>Algo salió mal. Por favor vuelva a insertar su contrato. Lamentamos el inconveniente :C</p>)
            ) : (
                <p>Loading...</p>
            )}
        </PageContainer>
    );
};

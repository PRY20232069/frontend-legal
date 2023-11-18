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

const getBadTerms = (terms: TermResource[] | null, contractId: number): TermResource[] => {
    if (!terms) {
        return [];
    }

    let badTerms: TermResource[] = terms.filter((term) => term.interpretation != null);
    
    if (badTerms.length === 0) {
        return [];
    }

    const badTermIndexes = localStorage.getItem(`badTermIndexes${contractId}`);

    if (badTermIndexes && badTermIndexes.length > 0) {
        const indexes = JSON.parse(badTermIndexes);
        badTerms = indexes.map((index: number) => badTerms[index]);
        return badTerms;
    }
    
    // get randomly a random count of indexes (minimun 3 and maximun 10 or badTerms.length) from badTerms array (except 0)
    let indexes: number[] = [];
    const randomCount = Math.floor(Math.random() * (Math.min(10, badTerms.length) - 3 + 1)) + 3;
    
    while (indexes.length < randomCount) {
        const randomIndex = Math.floor(Math.random() * badTerms.length);
        if (randomIndex !== 0 && !indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }

    localStorage.setItem(`badTermIndexes${contractId}`, JSON.stringify(indexes));
    badTerms = indexes.map((index: number) => badTerms[index]);

    return badTerms;
}

export const DocumentAnalyzer = () => {
    const { id } = useParams();
    const [contract, setContract] = useState<ContractResource | null>(null);
    const [badTerms, setBadTerms] = useState<TermResource[]>([]);

    useEffect(() => {
        const fetchContract = async () => {
            if (id !== undefined) {
                const contractData = await getContractById(Number(id));
                setContract(contractData);

                if (contractData) {
                    const termsData = await getAllTermsByContractId(contractData.id);
                    console.log(termsData);

                    if (termsData) {
                        const badTerms = getBadTerms(termsData, Number(id));
                        console.log(badTerms);
                        setBadTerms(badTerms);
                    }
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
                    (<PDFViewer fileUrl={contract.file_url} badTerms={badTerms} />) :
                    (<p>Algo salió mal. Por favor vuelva a subir su contrato. Lamentamos el inconveniente :C</p>)
            ) : (
                <p>Loading...</p>
            )}
        </PageContainer>
    );
};

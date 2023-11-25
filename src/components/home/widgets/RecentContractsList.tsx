import { useCallback, useEffect, useState } from "react";
import { ContractResource } from "../../../resources/responses/ContractResource";
import { ContractsApiService } from "../../../services/ContractsApiService";
import { RecentContractsListContainer } from "../layout/RecentContractsListContainer";
import { RecentContractItem } from "./RecentContractItem";
import { SectionTitle } from "./SectionTitle";

const getAllContracts = async (): Promise<any> => {
    try {
        const contractResources: ContractResource[] = await ContractsApiService.getAllContracts();
        contractResources.sort((a, b) => {
            return new Date(b.uploaded_date).getTime() - new Date(a.uploaded_date).getTime();
        });
        contractResources.splice(5, contractResources.length - 5);
        return contractResources;
    } catch (error) {
        console.error('Error during file upload', error);
    }
};

export const RecentContractsList = () => {
    const [contractItems, setContractItems] = useState<ContractResource[]>([]);

    useEffect(() => {
        const fetchContracts = async () => {
            const contractResources = await getAllContracts();
            setContractItems(contractResources || []);
        };

        fetchContracts();
    }, []);

    const onHistoryItemUpdate = useCallback((updatedData: ContractResource) => {
        setContractItems(prevItems => {
            const updatedItems = [...prevItems];
            const index = updatedItems.findIndex(item => item.id === updatedData.id);
            updatedItems[index] = updatedData;
            return updatedItems;
        });
    }, []);

    return (
        <div>
            <SectionTitle>Contratos recientes</SectionTitle>
            <RecentContractsListContainer>
                {contractItems && (
                    contractItems.length > 0 ?
                        contractItems.map((item, index) => (
                            <RecentContractItem key={index} data={item} onUpdate={onHistoryItemUpdate} />
                        )) :
                        <p style={{ marginLeft: 15 }}>No se han subido contratos recientemente</p>
                )
                }
            </RecentContractsListContainer>
        </div>
    );
}
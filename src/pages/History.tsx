import { useState, useCallback, useEffect } from "react";
import { filterItemsByString } from "../shared/utils/search-utils";
import { SearchBar } from "../components/shared/widgets/SearchBar";
import { HistoryListItem } from "../components/history/widgets/HistoryListItem";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { PageSubtitle } from "../components/shared/widgets/PageSubtitle";
import { FiltersBar } from "../components/shared/layout/FiltersBar";
import { HistoryListContainer } from "../components/history/layout/HistoryListContainer";
import { HistoryListHeader } from "../components/history/widgets/HistoryListHeader";
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";

const getAllContracts = async (): Promise<any> => {
  try {
    const contractResources: ContractResource[] = await ContractsApiService.getAllContracts();
    return contractResources;
  } catch (error) {
    console.error('Error during file upload', error);
  }
};

export const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contractItems, setContractItems] = useState<ContractResource[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContractResource[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      const contractResources = await getAllContracts();
      setContractItems(contractResources || []);
      setFilteredItems(contractResources || []);
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    const filtered = filterItemsByString(contractItems, 'name', searchTerm);
    setFilteredItems(filtered);
  }, [contractItems, searchTerm]);

  const onHistoryItemUpdate = useCallback((updatedData: ContractResource) => {
    setContractItems(prevItems => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex(item => item.id === updatedData.id);
      updatedItems[index] = updatedData;
      return updatedItems;
    });
  }, []);

  return (
    <PageContainer>
      <PageTitle>Historial</PageTitle>
      <PageSubtitle>Explora y gestiona todos tus contratos analizados</PageSubtitle>

      <FiltersBar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </FiltersBar>

      <HistoryListContainer>
        <HistoryListHeader />
        {filteredItems && (
          filteredItems.length > 0 ?
            filteredItems.map((item, index) => (
              <HistoryListItem key={index} data={item} onUpdate={onHistoryItemUpdate} />
            )) :
            <p style={{ marginLeft: 15 }}>No hay contratos en el historial</p>
        )
        }
      </HistoryListContainer>
    </PageContainer>
  );
};
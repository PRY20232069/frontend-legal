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
import Typography from "@mui/material/Typography";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../components/shared/widgets/ToastDisplay";
import LoadingComponent from "../components/shared/widgets/LoadingComponent";

const getAllContracts = async (): Promise<any> => {
  try {
    const contractResources: ContractResource[] =
      await ContractsApiService.getAllContracts();
    return contractResources;
  } catch (error) {
    console.error("Error during file upload", error);
  }
};

export const History = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contractItems, setContractItems] = useState<ContractResource[]>([]);
  const [filteredItems, setFilteredItems] = useState<ContractResource[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setLoading(true);
        const contractResources = await getAllContracts();
        setContractItems(contractResources || []);
        setFilteredItems(contractResources || []);

        if (contractResources === undefined) {
          toast.error(
            <ToastDisplay
              title="Error en el servidor, intenta nuevamente"
              message=""
            />
          );
        }
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  useEffect(() => {
    const filtered = filterItemsByString(contractItems, "name", searchTerm);
    setFilteredItems(filtered);
  }, [contractItems, searchTerm]);

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

  const onHistoryItemDelete = useCallback((contractId: number) => {
    setContractItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== contractId);
      return updatedItems;
    });
  }, []);

  return (
    <PageContainer>
      <PageTitle>Historial</PageTitle>
      <PageSubtitle>
        Explora, visualizar y gestiona todos tus contratos analizados.
      </PageSubtitle>
      <FiltersBar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </FiltersBar>

      <HistoryListContainer>
        <HistoryListHeader />
        {!loading ? (
          <>
            {filteredItems &&
              (filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <HistoryListItem
                    key={index}
                    data={item}
                    onUpdate={onHistoryItemUpdate}
                    onRemove={onHistoryItemDelete}
                  />
                ))
              ) : (
                <p style={{ marginLeft: 15, textAlign: "center" }}>
                  No se encontraron contratos en el historial
                </p>
              ))}{" "}
          </>
        ) : (
          <></>
        )}
      </HistoryListContainer>
      <Toaster />
      {loading && <LoadingComponent />}
    </PageContainer>
  );
};

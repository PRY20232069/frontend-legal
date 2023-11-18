import { useState, useEffect } from "react";
import { filterItemsByString } from "../shared/utils/search-utils";
import { SearchBar } from "../components/shared/widgets/SearchBar";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { PageSubtitle } from "../components/shared/widgets/PageSubtitle";
import { FiltersBar } from "../components/shared/layout/FiltersBar";
import { HistoryListContainer } from "../components/history/layout/HistoryListContainer";
import { BanksApiService } from "../services/BanksApiService";
import { BankResource } from "../resources/responses/BankResource";
import { RankingListItem } from "../components/ranking/widgets/RankingListItem";
import { RankingListHeader } from "../components/ranking/widgets/HistoryListHeader";

const getAllBanks = async (): Promise<any> => {
  try {
    const bankResources: BankResource[] = await BanksApiService.getAllBanks();
    return bankResources;
  } catch (error) {
    console.error('Error during file upload', error);
  }
};

export const Ranking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bankItems, setBankItems] = useState<BankResource[]>([]);
  const [filteredItems, setFilteredItems] = useState<BankResource[]>([]);

  useEffect(() => {
    const fetchBanks = async () => {
      const bankResources = await getAllBanks();
      setBankItems(bankResources);
      setFilteredItems(bankResources);
    };

    fetchBanks();
  }, []);

  useEffect(() => {
    const filtered = filterItemsByString(bankItems, 'name', searchTerm);
    setFilteredItems(filtered);
  }, [bankItems, searchTerm]);

  return (
    <PageContainer>
      <PageTitle>Ranking</PageTitle>
      <PageSubtitle>Compara y elige el mejor banco para tus contratos.</PageSubtitle>

      <FiltersBar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </FiltersBar>

      <HistoryListContainer>
        <RankingListHeader />
        {filteredItems && (
          filteredItems.length > 0 ?
            filteredItems.map((item, index) => (
              <RankingListItem key={index} data={item} />
            )) :
            <p style={{ marginLeft: 15 }}>Cargando bancos...</p>
        )
        }
      </HistoryListContainer>
    </PageContainer>
  );
};
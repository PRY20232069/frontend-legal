import { useState, useCallback } from "react";
import { IDocument } from "../interfaces/IHistory";
import { filterItemsByStringAndBoolean } from "../shared/utils/search-utils";
import { SearchBar } from "../components/shared/widgets/SearchBar";
import { HistoryListItem } from "../components/history/widgets/HistoryListItem";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { PageSubtitle } from "../components/shared/widgets/PageSubtitle";
import { FiltersBar } from "../components/shared/layout/FiltersBar";
import { HistoryListContainer } from "../components/history/layout/HistoryListContainer";

import historyExamplesData from '../shared/utils/mock/history_examples.json';
import { HistoryListHeader } from "../components/history/widgets/HistoryListHeader";

export const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState(historyExamplesData as IDocument[]);

  const filteredItems = filterItemsByStringAndBoolean(historyItems, 'title', searchTerm, 'favorite');

  const onHistoryItemUpdate = useCallback((updatedData: IDocument) => {
    setHistoryItems(prevItems => {
      const updatedItems = [...prevItems];
      const index = updatedItems.findIndex(item => item.id === updatedData.id);
      updatedItems[index] = updatedData;
      return updatedItems;
    });
  }, []);

  return (
    <PageContainer>
      <PageTitle>Favoritos</PageTitle>
      <PageSubtitle>Revisa tus contratos favoritos</PageSubtitle>

      <FiltersBar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </FiltersBar>

      <HistoryListContainer>
        <HistoryListHeader />
        {filteredItems.map((item, index) => (
          <HistoryListItem key={index} data={item} onUpdate={onHistoryItemUpdate} />
        ))}
      </HistoryListContainer>
    </PageContainer>
  );
};
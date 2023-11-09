import React, { useState } from "react";
import { IDocument } from "../interfaces/IHistory";
import { removeDiacritics } from "../shared/utils/search-utils";
import historyExamplesData from '../shared/utils/mock/history_examples.json';

import { SearchBar } from "../components/shared/widgets/SearchBar";
import { HistoryListItem } from "../components/history/widgets/HistoryListItem";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { PageSubtitle } from "../components/shared/widgets/PageSubtitle";
import { HistoryOptionsBar } from "../components/history/layout/HistoryOptionsBar";
import { HistoryListContainer } from "../components/history/layout/HistoryListContainer";

const historyExamples: IDocument[] = historyExamplesData.map((item: any) => ({
  ...item,
  uploaded_date: new Date(item.uploaded_date)
}));

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [historyItems, setHistoryItems] = useState(historyExamples);

  const ulStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  // Filter the historyItems array
  const filteredItems = historyItems.filter(item =>
    removeDiacritics(item.title.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
  );

  const onHistoryItemUpdate = (updatedData: any) => {
    // Find the index of the updated item
    const index = historyItems.findIndex(item => item.id === updatedData.id);

    historyItems[index] = updatedData;
    setHistoryItems([...historyItems]);

  };

  return (
    <PageContainer>
      <PageTitle>Historial</PageTitle>
      <PageSubtitle>Explora y gestiona todos tus contratos analizados</PageSubtitle>

      <HistoryOptionsBar>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </HistoryOptionsBar>

      <HistoryListContainer>
        {filteredItems.map((item, index) => (
          <HistoryListItem key={index} data={item} onUpdate={onHistoryItemUpdate} />
        ))}
      </HistoryListContainer>
    </PageContainer>
  );
};

export default History;

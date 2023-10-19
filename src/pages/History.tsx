import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import { Box } from "@mui/material";
import { DrawerHeader } from "../components/shared/Material";
import { styled } from '@mui/system';
import historyExamples from '../helpers/history_examples.json';
import whiteStar from '../assets/star_white.svg';
import yellowStar from '../assets/star_yellow.svg';

const SearchBar = ({ searchTerm, setSearchTerm }: any) => {

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div style={{ display: 'flex', gap: '5px', backgroundColor: 'white', width: 'fit-content', border: '1px solid black' }}>
      <div>🔍</div>
      <input type="text" placeholder="Búsqueda" style={{ borderColor: 'transparent', outline: 'none' }} value={searchTerm} onChange={handleSearchChange} />
    </div>
  );
};

const ListItem = styled('li')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  backgroundColor: '#d9d9d9',
  borderRadius: '15px',
  padding: '15px',
  '&:hover': {
    backgroundColor: '#CECECE', // Change this to the color you want on hover
  },
}));

const HistoryItem = ({ data, onUpdate }: any) => {
  const handleClick = () => {
    // Create a copy of the data and toggle the favorite property
    const updatedData = { ...data, favorite: !data.favorite };

    // Call the onUpdate function with the updated data
    onUpdate(updatedData);
  };

  return (
    <ListItem>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>{data.title}</div>
        <div>{data.date}</div>
      </div>
      <div>Cantidad de observaciones: {data.observations}</div>
      <div>
        <IconButton color="primary" onClick={handleClick}>
          <img src={data.favorite ? yellowStar : whiteStar} alt="⭐" width={'30px'} />
        </IconButton>
      </div>
    </ListItem>
  );
};

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [testingData, setTestingData] = useState(historyExamples);

  const ulStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  // Function to remove diacritics (accents) from a string
  const removeDiacritics = (str: any) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Filter the testingData array
  const filteredData = testingData.filter(item =>
    removeDiacritics(item.title.toLowerCase()).includes(removeDiacritics(searchTerm.toLowerCase()))
  );

  const onHistoryItemUpdate = (updatedData: any) => {
    // Find the index of the updated item
    const index = testingData.findIndex(item => item.id === updatedData.id);

    testingData[index] = updatedData;
    setTestingData([...testingData]);
    
  };

  return (
    <Box component="main" style={{ width: '100%' }}>
      <DrawerHeader />
      <div style={{ margin: '0 70px' }}>
        <h1>History</h1>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f1f1f1', padding: '10px 50px', borderRadius: '15px', gap: '20px' }}>
          <div style={{ display: 'flex' }}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <ul style={ulStyle}>
            {filteredData.map((item, index) => (
              <HistoryItem key={index} data={item} onUpdate={onHistoryItemUpdate} />
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default History;

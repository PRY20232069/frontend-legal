import React, { useState } from "react";
import { Box } from "@mui/material";
import { DrawerHeader } from "../components/shared/Material";
import { styled } from '@mui/system';

const SearchBar = ({ searchTerm, setSearchTerm }: any) => {
  
  const handleSearchChange = (event: any) => {
    console.log('siu');
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

const HistoryItem = ({ data }: any) => {
  return (
    <ListItem>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div>{data.title}</div>
        <div>{data.date}</div>
      </div>
      <div>Cantidad de observaciones: {data.observations}</div>
      <div>{data.favorite && <div>⭐</div>}</div>
    </ListItem>
  );
};

const testingData = [
  {
    title: 'TÍTULO DEL CONTRATO',
    date: '15/04/2022',
    observations: 15,
    favorite: false,
  },
  {
    title: 'Contrato de seguro por préstamos de auto',
    date: '21/01/2022',
    observations: 10,
    favorite: false,
  },
  {
    title: 'Contrato por préstamo hipotecario',
    date: '09/11/2021',
    observations: 23,
    favorite: true,
  },
  {
    title: 'Contrato por préstamo hipotecario',
    date: '09/11/2021',
    observations: 23,
    favorite: false,
  },
  {
    title: 'Contrato por préstamo hipotecario',
    date: '09/11/2021',
    observations: 23,
    favorite: false,
  },
  {
    title: 'Contrato por préstamo hipotecario',
    date: '09/11/2021',
    observations: 23,
    favorite: false,
  },
  {
    title: 'Contrato por préstamo hipotecario',
    date: '09/11/2021',
    observations: 23,
    favorite: false,
  },
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <Box component="main" style={{ width: '100%' }}>
      <DrawerHeader />
      <div style={{ margin: '0 70px' }}>
        <h1>History</h1>
        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f1f1f1', padding: '10px 50px', borderRadius: '15px', gap: '20px' }}>
          <div style={{ display: 'flex' }}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button>Find</button>
          </div>
          <ul style={ulStyle}>
            {filteredData.map((item, index) => (
              <HistoryItem key={index} data={item} />
            ))}
          </ul>
        </div>
      </div>
    </Box>
  );
};

export default History;

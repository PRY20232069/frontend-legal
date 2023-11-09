import { styled } from '@mui/system';

export const ListItemsContainer = styled('li')(({ theme }) => ({
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
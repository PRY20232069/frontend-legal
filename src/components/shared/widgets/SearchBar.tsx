import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // border: '2px solid rgba(0, 0, 0, 0.87)',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '270px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export function SearchBar({ searchTerm, setSearchTerm }: any) {
    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                aria-label="search"
                value={searchTerm}
                onChange={handleSearchChange}
            />
        </Search>
    );
}

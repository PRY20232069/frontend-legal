export const SearchBarOld = ({ searchTerm, setSearchTerm }: any) => {

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
import styled from "@emotion/styled";

const ListHeaderContainer = styled('li')(({ theme }) => ({
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '10px 10px 0 0',
    padding: '15px',
    margin: '6px',
}));

export const HistoryListHeader = () => {
    return (
        <ListHeaderContainer>
            <div style={{ flex: 3 }}>Título</div>
            <div style={{ flex: 1 }}>Fecha de subida</div>
            <div style={{ flex: 2 }}>N° Observaciones</div>
            <div style={{ width: 46 }}></div>
        </ListHeaderContainer>
    );
}
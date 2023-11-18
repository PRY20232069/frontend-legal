import styled from "@emotion/styled";

const ListHeaderContainer = styled('li')(({ theme }) => ({
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '10px 10px 0 0',
    padding: '15px',
    margin: '6px',
}));

export const RankingListHeader = () => {
    return (
        <ListHeaderContainer>
            <div style={{ flex: 3 }}>Nombre</div>
            <div style={{ flex: 2 }}>N° de Contratos</div>
        </ListHeaderContainer>
    );
}
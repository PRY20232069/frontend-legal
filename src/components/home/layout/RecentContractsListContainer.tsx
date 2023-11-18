import styled from "@emotion/styled";

export const RecentContractsListContainer = (props: any) => {
    const Container = styled('ul')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '10px 0 0 -1px',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
    }));

    return (
        <Container>
            {props.children}
        </Container>
    );
}
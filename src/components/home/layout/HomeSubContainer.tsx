import styled from "@emotion/styled";

export const HomeSubContainer = (props: any) => {
    const Container = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        flex: 1,
    }));

    return (
        <Container>
            {props.children}
        </Container>
    );
}
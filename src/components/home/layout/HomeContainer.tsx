import styled from "@emotion/styled";

export const HomeContainer = (props: any) => {
    const Container = styled('div')(({ theme }) => ({
        display: 'flex',
        width: '100%',
    }));

    return (
        <Container>
            {props.children}
        </Container>
    );
}
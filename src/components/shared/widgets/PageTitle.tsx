import styled from "@emotion/styled";

const TitleH2 = styled.h2`
    margin-bottom: 0;
`;

export const PageTitle = (props: any) => {
    return (
        <TitleH2>{props.children}</TitleH2>
    );
};
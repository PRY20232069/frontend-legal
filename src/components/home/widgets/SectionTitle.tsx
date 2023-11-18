import styled from "@emotion/styled";

const TitleH2 = styled.h2`
    margin-bottom: 0;
    font-size: 20px;
`;

export const SectionTitle = (props: any) => {
    return (
        <TitleH2>{props.children}</TitleH2>
    );
};
import styled from "@emotion/styled";

const SubtitleH3 = styled.h3`
    font-size: 17px;
    font-weight: 500;
    margin-top: 0;
`;

export const PageSubtitle = (props: any) => {
    return (
        <SubtitleH3>{props.children}</SubtitleH3>
    );
};
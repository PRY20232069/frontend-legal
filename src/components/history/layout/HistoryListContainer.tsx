import styled from "@emotion/styled";

export const HistoryListContainer = (props: any) => {
    const HistoryList = styled('ul')(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        margin: '20px 0 0 0',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        borderRadius: '12px',
    }));

    return (
        <HistoryList>
            {props.children}
        </HistoryList>
    );
}
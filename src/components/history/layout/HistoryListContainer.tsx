export const HistoryListContainer = (props: any) => {
    const ulStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    };

    return (
        <ul style={ulStyle}>
            {props.children}
        </ul>
    );
}
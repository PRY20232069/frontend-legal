import React, { useCallback } from 'react';
import { IDocument } from '../../../interfaces/IHistory';
import { useNavigate } from "react-router-dom";
import { ListItemButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import markSvg from '../../../assets/svgs/mark.svg';
import markOutlinedSvg from '../../../assets/svgs/mark_outlined.svg';
import styled from '@emotion/styled';

type Props = {
    data: IDocument;
    onUpdate: (data: IDocument) => void;
};

const ListItemContainer = styled('li')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: '3px 6px',
    '&:last-child': {
        borderRadius: '0 0 10px 10px',
        margin: '3px 6px 6px',
    },
}));

const ListItemLink = (props:any) => {
    const navigate = useNavigate();

    return (
        <ListItemButton style={{ padding: '8px 15px', width: '100%', height: '100%' }} onClick={() => navigate(props.to)}>
            {props.children}
        </ListItemButton>
    );
}

export const HistoryListItem: React.FC<Props> = ({ data, onUpdate }) => {
    const updateData = useCallback(() => {
        const updatedData = { ...data, favorite: !data.favorite } as IDocument;
        onUpdate(updatedData);
    }, [data, onUpdate]);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        updateData();
    }

    // Rest of your component
    return (
        <ListItemContainer>
            <ListItemLink to="/document-analyzer">
                <div style={{ flex: 3 }}>{data.title}</div>
                <div style={{ flex: 1 }}>{data.uploaded_date}</div>
                <div style={{ flex: 2 }}>Cantidad de observaciones: {data.num_observations}</div>
                <div style={{ width: 46 }}>
                    <IconButton color="primary" onClick={handleClick}>
                        <img src={data.favorite ? markSvg : markOutlinedSvg} alt={data.favorite ? "⭐" : "~"} width={'20px'} />
                    </IconButton>
                </div>
            </ListItemLink>
        </ListItemContainer>
    );
};
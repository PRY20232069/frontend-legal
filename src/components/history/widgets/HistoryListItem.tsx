import React, { useCallback } from 'react';
import { ListItemsContainer } from '../../shared/layout/ListItemsContainer';
import { IDocument } from '../../../interfaces/IHistory';
import IconButton from '@mui/material/IconButton';
import whiteStar from '../../../assets/star_white.svg';
import yellowStar from '../../../assets/star_yellow.svg';

type Props = {
    data: IDocument;
    onUpdate: (data: { favorite: boolean }) => void;
};

export const HistoryListItem: React.FC<Props> = ({ data, onUpdate }) => {
    const handleClick = useCallback(() => {
        const updatedData = { ...data, favorite: !data.favorite };
        onUpdate(updatedData);
    }, [data, onUpdate]);

    // Rest of your component
    return (
        <ListItemsContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <div>{data.title}</div>
                <div>{data.uploaded_date.toLocaleDateString('en-GB')}</div>
            </div>
            <div>Cantidad de observaciones: {data.num_observations}</div>
            <div>
                <IconButton color="primary" onClick={handleClick}>
                    <img src={data.favorite ? yellowStar : whiteStar} alt="⭐" width={'30px'} />
                </IconButton>
            </div>
        </ListItemsContainer>
    );
};
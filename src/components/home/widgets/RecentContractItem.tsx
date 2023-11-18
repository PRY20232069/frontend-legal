import React, { useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { ListItemButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import markSvg from '../../../assets/svgs/mark.svg';
import markOutlinedSvg from '../../../assets/svgs/mark_outlined.svg';
import styled from '@emotion/styled';
import { ContractResource } from '../../../resources/responses/ContractResource';
import { SaveContractResource } from '../../../resources/requests/SaveContractResource';
import { ContractsApiService } from '../../../services/ContractsApiService';

const markContractAsFavorite = async (contract: ContractResource): Promise<any> => {
    try {
        let saveContractResource: SaveContractResource = { 
            name: contract.name, 
            bank_id: contract.bank_id, 
            favorite: !contract.favorite
         };
        const contractResource: ContractResource = await ContractsApiService.updateContract(contract.id, saveContractResource);
        return contractResource;
    } catch (error) {
        console.error('Error during file upload', error);
    }
};

type Props = {
    data: ContractResource;
    onUpdate: (data: ContractResource) => void;
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

const ListItemLink = (props: any) => {
    const navigate = useNavigate();

    return (
        <ListItemButton style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 15px', width: '100%', height: '100%' }} onClick={() => navigate(props.to)}>
            {props.children}
        </ListItemButton>
    );
}

export const RecentContractItem: React.FC<Props> = ({ data, onUpdate }) => {
    const updateData = useCallback(() => {
        const updatedData: ContractResource = { ...data, favorite: !data.favorite };
        onUpdate(updatedData);
    }, [data, onUpdate]);

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        updateData();
        markContractAsFavorite(data);
    }

    const formattedDate = (_date: Date) => {
        const date = new Date(_date);
        const day = date.getDate().toString().padStart(2, '0'); // Asegura que el día siempre tenga dos dígitos
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript empiezan en 0, por lo que debes sumar 1
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    // Rest of your component
    return (
        <ListItemContainer>
            <ListItemLink to={`/document-analyzer/${data.id}`}>
                <div>
                    <div style={{ flex: 3 }}>{data.name}</div>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>{formattedDate(data.uploaded_date)}</div>
                        <div style={{ flex: 2 }}>N° Obs: 5 {/*data.num_observations*/}</div>
                    </div>
                </div>
                <div style={{ width: 46 }}>
                    <IconButton color="primary" onClick={handleClick}>
                        <img src={data.favorite ? markSvg : markOutlinedSvg} alt={data.favorite ? "⭐" : "~"} width={'20px'} />
                    </IconButton>
                </div>
            </ListItemLink>
        </ListItemContainer>
    );
};
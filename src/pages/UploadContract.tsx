import { useState } from "react";
import { UploadContractBtn } from "../components/documentAnalyzer/UploadContractBtn";
import { ContractsApiService } from "../services/ContractsApiService";
import { SaveContractResource } from "../resources/requests/SaveContractResource";
import { ContractResource } from "../resources/responses/ContractResource";
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";

const uploadContract = async (name: string, file: any): Promise<any> => {
    try {
        const saveContractResource: SaveContractResource = { name, bank_id: 1 };
        const contractResource: ContractResource = await ContractsApiService.uploadContract(saveContractResource);
        if (!contractResource.id) {
            throw new Error('Contract id is not defined');
        }

        const contractWithUrlResource: ContractResource = await ContractsApiService.uploadPDF(contractResource.id, file);
        console.log(contractWithUrlResource);
        if (!contractWithUrlResource.file_url) {
            throw new Error('File url is not defined');
        }
        
        const termResources = await ContractsApiService.generateTermsInterpretationByContractId(contractWithUrlResource.id);
        console.log(termResources);
        
        return contractWithUrlResource;
    } catch (error) {
        console.error('Error during file upload', error);
    }
}

export const UploadContract = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
        if (file) {
            setShowAnalyzeButton(true);
        }
    };

    const handleAnalyzeClick = async () => {
        if (selectedFile) {
            const contractResource = await uploadContract(selectedFile.name, selectedFile);
            console.log(contractResource);
            if (contractResource && contractResource.id) {
                navigate(`/document-analyzer/${contractResource.id}`);
            }
        }
    };

    return (
        <div>
            <h1>Upload Contract</h1>
            <UploadContractBtn onFileChange={handleFileChange} />
            {showAnalyzeButton && (
                <>
                    <p>Archivo seleccionado: {selectedFile?.name}</p>
                    <Button variant="contained" onClick={handleAnalyzeClick}>Analizar</Button>
                </>
            )}
        </div>
    );
};
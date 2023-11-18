import { useNavigate } from "react-router-dom";
import { UploadContractBtn } from "../../documentAnalyzer/UploadContractBtn";
import { SectionTitle } from "./SectionTitle";

export const QuickActions = () => {
    const navigate = useNavigate();
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        
        if (file) {
            navigate(`/upload-contract`, { state: { fileLoaded: file } });
        }
    };

    return (
        <div>
            <SectionTitle>Acciones Rápidas</SectionTitle>
            <UploadContractBtn onFileChange={handleFileChange} />
        </div>
    );
}
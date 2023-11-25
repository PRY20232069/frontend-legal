import { useEffect, useState } from "react";
import { UploadContractBtn } from "../components/documentAnalyzer/UploadContractBtn";
import { ContractsApiService } from "../services/ContractsApiService";
import { SaveContractResource } from "../resources/requests/SaveContractResource";
import { ContractResource } from "../resources/responses/ContractResource";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { BankResource } from "../resources/responses/BankResource";
import { BanksApiService } from "../services/BanksApiService";

const uploadContract = async (
  name: string,
  file: any,
  bankId: number
): Promise<any> => {
  try {
    const saveContractResource: SaveContractResource = {
      name,
      bank_id: bankId,
    };
    const contractResource: ContractResource =
      await ContractsApiService.uploadContract(saveContractResource);
    if (!contractResource.id) {
      throw new Error("Contract id is not defined");
    }

    const contractWithUrlResource: ContractResource =
      await ContractsApiService.uploadPDF(contractResource.id, file);
    console.log(contractWithUrlResource);
    if (!contractWithUrlResource.file_url) {
      throw new Error("File url is not defined");
    }

    const termResources =
      await ContractsApiService.generateTermsInterpretationByContractId(
        contractWithUrlResource.id
      );
    console.log(termResources);

    return contractWithUrlResource;
  } catch (error) {
    console.error("Error during file upload", error);
    alert(
      "Se produjo un error mientras se analizaba el documento, inténtelo nuevamente."
    );
  }
};

const getAllBanks = async (): Promise<any> => {
  try {
    const bankResources: BankResource[] = await BanksApiService.getAllBanks();
    return bankResources;
  } catch (error) {
    console.error("Error during file upload", error);
  }
};

export const UploadContract = () => {
  const location = useLocation();
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const [banks, setBanks] = useState<BankResource[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileErrorMessage, setFileErrorMessage] = useState("");
  const [selectedBank, setSelectedBank] = useState("selectopt");
  const [bankErrorMessage, setBankErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.fileLoaded) {
      setSelectedFile(location.state.fileLoaded);
      setShowAnalyzeButton(true);
    }
  }, [location]);

  useEffect(() => {
    const fetchBanks = async () => {
      const bankResources = await getAllBanks();
      setBanks(bankResources || []);
    };

    fetchBanks();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    if (file) {
      setShowAnalyzeButton(true);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!selectedFile) {
      setFileErrorMessage("Por favor, selecciona un archivo.");
      return;
    }
    setFileErrorMessage("");

    if (selectedBank === "selectopt") {
      setBankErrorMessage("Por favor, selecciona un banco.");
      return;
    }
    setBankErrorMessage("");

    setLoading(true);
    const contractResource = await uploadContract(
      selectedFile.name,
      selectedFile,
      Number(selectedBank)
    );
    setLoading(false);

    console.log(contractResource);
    if (contractResource && contractResource.id) {
      navigate(`/document-analyzer/${contractResource.id}`);
    }
  };

  return (
    <PageContainer>
      <PageTitle>Subir Contrato</PageTitle>
      <div style={{ marginTop: "15px" }}>
        <UploadContractBtn onFileChange={handleFileChange} />
        {showAnalyzeButton && (
          <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <b>Archivo seleccionado:</b>
              <TextField
                value={selectedFile?.name || ""}
                InputProps={{ readOnly: true }}
                size="small"
                style={{ width: "550px" }}
              />
            </div>
            {fileErrorMessage && (
              <div style={{ color: "red" }}>{fileErrorMessage}</div>
            )}
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <b>Banco que redactó el contrato:</b>
              <Select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                size="small"
              >
                <MenuItem value="selectopt">
                  <em>Seleccione un banco</em>
                </MenuItem>
                {banks.map((bank, i: number) => (
                  <MenuItem key={i} value={bank.id}>
                    {bank.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {bankErrorMessage && (
              <div style={{ color: "red" }}>{bankErrorMessage}</div>
            )}
            <Button variant="contained" onClick={handleAnalyzeClick}>
              Analizar
            </Button>
            <div style={{ marginTop: "25px" }}>
              {loading && <CircularProgress />}
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

import { useEffect, useState } from "react";
import { UploadContractBtn } from "../components/documentAnalyzer/UploadContractBtn";
import { ContractsApiService } from "../services/ContractsApiService";
import { SaveContractResource } from "../resources/requests/SaveContractResource";
import { ContractResource } from "../resources/responses/ContractResource";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { BankResource } from "../resources/responses/BankResource";
import { BanksApiService } from "../services/BanksApiService";
import { TermResource } from "../resources/responses/TermResource";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../components/shared/widgets/ToastDisplay";
import LoadingComponent from "../components/shared/widgets/LoadingComponent";
import DragAndDrop from "../components/documentAnalyzer/DragAndDrop";
import "../shared/styles/dropzone.css";
import { CustomButton } from "../components/shared/widgets/Mui/Button";

// const uploadContractV1 = async (
//   name: string,
//   file: any,
//   bankId: number
// ): Promise<any> => {
//   try {
//     const saveContractResource: SaveContractResource = {
//       name,
//       bank_id: bankId,
//     };

//     // 1. Crea el contrato
//     const contractResource: ContractResource =
//       await ContractsApiService.uploadContract(saveContractResource);
//     if (!contractResource.id) {
//       throw new Error("Contract id is not defined");
//     }

//     // 2. Sube el archivo
//     const contractWithUrlResource: ContractResource =
//       await ContractsApiService.uploadPDF(contractResource.id, file);
//     console.log(contractWithUrlResource);
//     if (!contractWithUrlResource.file_url) {
//       throw new Error("File url is not defined");
//     }

//     // 3. Analiza el contrato
//     const termsWithInterpretationResources: TermResource[] =
//       await ContractsApiService.generateTermsInterpretationByContractId(
//         contractWithUrlResource.id
//       );
//     if (
//       !termsWithInterpretationResources ||
//       termsWithInterpretationResources.length === 0 ||
//       !termsWithInterpretationResources[0].interpretation
//     ) {
//       console.error(
//         "Error during file upload: terms do not have interpretation"
//       );
//     }

//     // 4. Analiza las leyes de protección al consumidor
//     const termsWithConsumerProtectionLawResources: TermResource[] =
//       await ContractsApiService.matchTermsWithConsumerProtectionLawsByContractId(
//         contractWithUrlResource.id
//       );
//     if (
//       !termsWithConsumerProtectionLawResources ||
//       termsWithConsumerProtectionLawResources.length === 0 ||
//       !termsWithConsumerProtectionLawResources[0].consumer_protection_law
//     ) {
//       console.error(
//         "Error during file upload: terms do not have consumer protection law"
//       );
//     }

//     console.log(termsWithConsumerProtectionLawResources);

//     return contractWithUrlResource;
//   } catch (error) {
//     console.error("Error during file upload", error);
//     alert(
//       "Se produjo un error mientras se analizaba el documento, inténtelo nuevamente."
//     );
//   }
// };

const uploadContractV2 = async (bankId: number, file: any): Promise<any> => {
  try {
    const contractResource: ContractResource =
      await ContractsApiService.uploadContractByBankId(bankId, file);
    return contractResource;
  } catch (error) {
    console.error("Error during file upload", error);
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

  const handleFileChange = (file: File) => {
    // const file = event.target.files ? event.target.files[0] : null;

    console.log(file);

    setSelectedFile(file);
    if (file) {
      setShowAnalyzeButton(true);
    }
  };

  const handleAnalyzeClick = async () => {
    let error = false;
    setLoading(true);

    if (!selectedFile) {
      error = true;
      <ToastDisplay title="Selecciona un documento" message="" />;
      setLoading(false);
    }

    if (selectedBank === "selectopt") {
      error = true;
      toast.error(
        <ToastDisplay
          title="Selecciona un banco antes de continuar"
          message=""
        />
      );
      setBankErrorMessage("Selecciona un banco antes de continuar");
      setLoading(false);
    }

    if (selectedFile!.type !== "application/pdf") {
      error = true;
      setTimeout(() => {
        toast.error(
          <ToastDisplay
            title="Documento con formato incorrecto, seleccione un PDF"
            message=""
          />
        );
        setFileErrorMessage("El formato seleccionado debe ser un PDF");
        setLoading(false);
      }, 2000);
    }

    if (!error) {
      setFileErrorMessage("");
      setBankErrorMessage("");

      // V1
      // const contractResource = await uploadContractV1(
      //   selectedFile!.name,
      //   selectedFile,
      //   Number(selectedBank)
      // );

      // V2
      const contractResource = await uploadContractV2(
        Number(selectedBank),
        selectedFile
      );

      setLoading(false);

      // Por el momento no está configurado en su totalidad el endpoint para redirigir a la página de análisis
      // console.log(contractResource);
      // if (contractResource && contractResource.id) {
      //   navigate(`/document-analyzer/${contractResource.id}`);
      // }
      if (contractResource && contractResource.id) {
        navigate(`/document-analyzer/${contractResource.id}`);
      }
    }
  };

  return (
    <PageContainer>
      {/* <PageTitle>Subir Contratos</PageTitle> */}
      <Typography
        variant="h5"
        color="#193A32"
        sx={{ mb: 2, fontWeight: "bold" }}
      >
        Subir contratos
      </Typography>
      <div style={{ marginTop: "15px" }}>
        <DragAndDrop onFileChange={handleFileChange} />
        {showAnalyzeButton && (
          <div style={{ marginTop: "20px" }}>
            <div>
              <Typography variant="body1" color="#193A32" sx={{ mt: 3, mb: 1 }}>
                Archivo seleccionado
              </Typography>
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
            <div>
              <Typography variant="body1" color="#193A32" sx={{ mt: 3, mb: 1 }}>
                Selecione el banco que redactó el contrato
              </Typography>
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
            <CustomButton
              variant="contained"
              onClick={handleAnalyzeClick}
              fullWidth
              sx={{ mt: 3, width: "50%" }}
            >
              Analizar
            </CustomButton>
            {loading && <LoadingComponent />}
          </div>
        )}
      </div>
      <Toaster />
    </PageContainer>
  );
};

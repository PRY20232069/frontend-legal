import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ContractResource } from "../resources/responses/ContractResource";
import { ContractsApiService } from "../services/ContractsApiService";
import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageSubtitle } from "../components/shared/widgets/PageSubtitle";

import { PDFViewer } from "../components/documentAnalyzer/pdfViewer/PDFViewer";
import { TermsApiService } from "../services/TermsApiService";
import { TermResource } from "../resources/responses/TermResource";
import LoadingComponent from "../components/shared/widgets/LoadingComponent";
import toast, { Toaster } from "react-hot-toast";
import ToastDisplay from "../components/shared/widgets/ToastDisplay";
import { setTimeout } from "timers/promises";
import { PageTitle } from "../components/shared/widgets/PageTitle";

const getContractById = async (id: number): Promise<any> => {
  try {
    const contractResource: ContractResource =
      await ContractsApiService.getContractById(id);
    console.log(contractResource);
    return contractResource;
  } catch (error) {
    console.error("Error during file upload", error);
  }
};

const getAllTermsByContractId = async (contractId: number): Promise<any> => {
  try {
    const termResources: TermResource[] =
      await TermsApiService.getAllTermsByContractId(contractId);
    return termResources;
  } catch (error) {
    console.error("Error getting terms", error);
  }
};

const getBadTerms = (
  terms: TermResource[] | null,
  contractId: number
): TermResource[] => {
  if (!terms) {
    return [];
  }

  let badTerms: TermResource[] = terms.filter(
    (term) => term.interpretation != null
  );

  if (badTerms.length === 0) {
    return [];
  }

  const badTermIndexes = localStorage.getItem(`badTermIndexes${contractId}`);

  if (badTermIndexes && badTermIndexes.length > 0) {
    const indexes = JSON.parse(badTermIndexes);
    badTerms = indexes.map((index: number) => badTerms[index]);
    return badTerms;
  }

  // get randomly a random count of indexes (minimun 3 and maximun 10 or badTerms.length) from badTerms array (except 0)
  let indexes: number[] = [];
  const randomCount =
    Math.floor(Math.random() * (Math.min(10, badTerms.length) - 3 + 1)) + 3;

  while (indexes.length < randomCount) {
    const randomIndex = Math.floor(Math.random() * badTerms.length);
    if (randomIndex !== 0 && !indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  localStorage.setItem(`badTermIndexes${contractId}`, JSON.stringify(indexes));
  badTerms = indexes.map((index: number) => badTerms[index]);

  return badTerms;
};

export const DocumentAnalyzer = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<ContractResource | null>(null);
  const [badTerms, setBadTerms] = useState<TermResource[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContract = async () => {
    setLoading(true);
    if (id !== undefined) {
      await getContractById(Number(id))
        .then(async (contractData) => {
          setContract(contractData);
          await getAllTermsByContractId(contractData.id)
            .then((termsData) => {
              console.log(termsData);
              if (termsData) {
                const badTerms = getBadTerms(termsData, Number(id));
                console.log(badTerms);
                setBadTerms(badTerms);
              }
            })
            .catch((error) => {
              toast.error(
                <ToastDisplay
                  title="Error en el servidor, intenta nuevamente"
                  message=""
                />
              );
            });
        })
        .catch((error) => {
          toast.error(
            <ToastDisplay
              title="Error en el servidor, intenta nuevamente"
              message=""
            />
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchContract();
  }, [id]);

  return (
    <div style={{ width: "100%" }}>
      <div style={{ margin: "30px 0px 0px 15px" }}>
        <PageTitle>Visualizar contratos</PageTitle>
        <PageSubtitle>{contract && contract.name}</PageSubtitle>
      </div>

      {!loading ? (
        contract && contract.file_url ? (
          <PDFViewer fileUrl={contract.file_url} badTerms={badTerms} />
        ) : (
          <p style={{ height: "70vh" }}>
            Algo salió mal, vuelve a intentarlo nuevamente!
          </p>
        )
      ) : (
        <LoadingComponent />
      )}
      <Toaster />
    </div>
  );
};

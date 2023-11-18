
import { useWelcomeChartConfig } from "../../../shared/utils/useWelcomeChartConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";
import { ChartContainer } from "../layout/ChartContainer";
import { BanksApiService } from "../../../services/BanksApiService";
import { BankResource } from "../../../resources/responses/BankResource";

const getAllBanks = async (): Promise<any> => {
  try {
    const bankResources: BankResource[] = await BanksApiService.getAllBanks();
    return bankResources;
  } catch (error) {
    console.error('Error during file upload', error);
  }
};

export function ContractsByBankChart() {
  const [bankItems, setBankItems] = React.useState<BankResource[]>([]);

  const fetchBanks = async () => {
    const bankResources = await getAllBanks();
    setBankItems(bankResources);
  };

  fetchBanks();

  React.useEffect(() => {

  }, []);

  const { data } = useWelcomeChartConfig({
    datums: bankItems.length > 0 ? bankItems.length : 1,
  }, [bankItems]);

  const primaryAxis = React.useMemo<AxisOptions<typeof data[number]["data"][number]>>(() => ({
      getValue: (datum) => datum.primary,
    }), []
  );

  const secondaryAxes = React.useMemo<AxisOptions<typeof data[number]["data"][number]>[]>(() => [{
        getValue: (datum) => datum.secondary,
      }], []
  );

  return (
    <ChartContainer>
      <Chart options={{ data, primaryAxis, secondaryAxes }} />
    </ChartContainer>
  );
}
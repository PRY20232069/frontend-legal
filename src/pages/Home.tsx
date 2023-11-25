import { PageContainer } from "../components/shared/layout/PageContainer";
import { PageTitle } from "../components/shared/widgets/PageTitle";
import { RecentContractsList } from "../components/home/widgets/RecentContractsList";
import { QuickActions } from "../components/home/widgets/QuickActions";
import { WelcomeLegalAdvices } from "../components/home/widgets/WelcomeLegalAdvices";
import { HomeSubContainer } from "../components/home/layout/HomeSubContainer";
import { HomeContainer } from "../components/home/layout/HomeContainer";
import { ContractsByBankChart } from "../components/home/widgets/ContractsByBankChart";

export const Home = () => {

  return (
    <PageContainer>
      <PageTitle>Inicio</PageTitle>

      <HomeContainer>
        <HomeSubContainer>
          <QuickActions />
        </HomeSubContainer>
        <HomeSubContainer>
          <WelcomeLegalAdvices />
          <RecentContractsList />
        </HomeSubContainer>
      </HomeContainer>
    </PageContainer>
  );
};
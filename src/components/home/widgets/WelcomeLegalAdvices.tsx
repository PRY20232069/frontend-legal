import { SectionTitle } from "./SectionTitle";
import welcomeLegalAdvicesData from "../../../shared/utils/mock/welcome_legal_advices.json";

export const WelcomeLegalAdvices = () => {
  const randomIndex = Math.floor(
    Math.random() * welcomeLegalAdvicesData.length
  );

  return (
    <div>
      <SectionTitle>{welcomeLegalAdvicesData[randomIndex].header}</SectionTitle>
      <div>{`"${welcomeLegalAdvicesData[randomIndex].content}"`}</div>
    </div>
  );
};

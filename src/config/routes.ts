import * as Pages from "../pages/pages";
import IRoute from "../interfaces/IRoute";

const routes: IRoute[] = [
  {
    path: "/configuration",
    name: "Configuration",
    component: Pages.Configuration,
  },
  {
    path: "/document-analyzer",
    name: "DocumentAnalyzer",
    component: Pages.DocumentAnalyzer,
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Pages.Favorites,
  },
  {
    path: "/history",
    name: "History",
    component: Pages.History,
  },
  {
    path: "/",
    name: "Home",
    component: Pages.Home,
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Pages.Ranking,
  },
  {
    path: "/subscription-plan",
    name: "SubscriptionPlan",
    component: Pages.SubscriptionPlan,
  },
];

export default routes;

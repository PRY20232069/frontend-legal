import * as Pages from "../pages/pages";
import IRoute from "../interfaces/IRoute";

const routes: IRoute[] = [
  {
    path: "/configuration",
    name: "Configuration",
    component: Pages.Configuration,
  },
  {
    path: "/upload-contract",
    name: "UploadContract",
    component: Pages.UploadContract,
  },
  {
    path: "/document-analyzer/:id",
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
    path: "/sign-in",
    name: "SignIn",
    component: Pages.SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: Pages.SignUp,
  },
  {
    path: "/subscription-plan",
    name: "SubscriptionPlan",
    component: Pages.SubscriptionPlan,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Pages.Profile,
  },
  {
    path: "/terms",
    name: "Terms",
    component: Pages.Profile,
  },
  {
    path: "/privacy",
    name: "Privacy",
    component: Pages.Profile,
  },
];

export default routes;

interface IPersonalInformation {
  id: number;
  name: String;
  lastName: String;
  email: String;
  sex: boolean;
  birthday: String;
  document: number;
}

interface IPlan {
  planId: number;
  planName: String;
  description: String;
  limit: number;
}

interface IMembership {
  plan: IPlan;
  usage: number;
}

export interface IProfile {
  personalInformation: IPersonalInformation;
  membership: IMembership;
  plans: IPlan[];
}

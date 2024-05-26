export interface IPersonalInformation {
  id: number;
  name: String;
  lastName: String;
  email: String;
  sex: String;
  birthday: String;
  document: number;
}

export interface IPlan {
  planId: number;
  planName: String;
  description: String;
  limit: number;
}

export interface IMembership {
  plan: IPlan;
  usage: number;
}

export interface IProfile {
  personalInformation: IPersonalInformation;
  membership: IMembership;
  plans: IPlan[];
}

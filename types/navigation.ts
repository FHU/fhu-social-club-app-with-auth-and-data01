export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  relationshipStatus: string;
  classification: string;
  email?: string;
  phone?: string;
  showEmail?: boolean;
  showPhone?: boolean;
  imageURL: string;
  officer?: string;
}

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Directory: undefined;
  Profile: { member: Member };
};
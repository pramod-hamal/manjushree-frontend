export interface ParticipantAddDTO {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  pronouns: string;
  preferredLanguage: string;
  ndisNumber: number;
  referenceNo: ReferenceNo[];
}

export interface ReferenceNo {
  title: string;
  value: number;
}
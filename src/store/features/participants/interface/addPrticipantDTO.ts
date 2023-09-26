export interface ParticipantAddDTO {
  id?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  pronouns: string;
  preferredLanguage: string;
  ndisNumber: number | string;
  primaryCoordinator?: null;
  references: ReferenceNo[];
}

export interface ReferenceNo {
  title: string;
  value: string;
}
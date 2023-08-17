import { PaginationMetaDTO } from "../../auth/interface/api.response";

export interface ParticipanSliceState {
  participants: Participant[];
  paginationMeta: PaginationMetaDTO;
}

export interface Participant {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  preferredLanguage: string;
  pronouns: string;
  primaryCoordinator: any | null;
  ndisNumber: number;
}

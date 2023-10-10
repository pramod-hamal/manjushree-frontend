import { Address } from "../../../individual/interface/contact.interface";

export interface OrganizationContactFormProps {
  editMode: boolean;
  value?: any;
}

export interface OrganizationContactDTO {
  name: string;
  email: string;
  occupationService: string;
  preferredContactMethod: string;
  isOrganization?: boolean;
  phone: string;
  note: string;
  url: string;
  address?: Address;
  logo?: null;
}

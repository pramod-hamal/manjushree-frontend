export interface AddIndividualContactDTO {
    name: string;
    email: string;
    occupationService: string;
    preferredContactMethod: string;
    isOrganization: boolean;
    address?: Address;
}

export interface Address {
    latitude?: number;
    longitude?: number;
    name: string;
}

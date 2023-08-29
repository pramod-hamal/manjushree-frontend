export interface UserContactResponse {
    id:       number;
    relation: string;
    contact:  Contact;
}

export interface Contact {
    id:                     number;
    name:                   string;
    email:                  string;
    phone?:                  string;
    occupationService?:      string;
    preferredContactMethod?: string;
    isOrganization:         boolean;
    note?:                   string;
}

export interface GetUserByIDDTO {
    id:         number;
    firstName:  string;
    middleName: null;
    lastName:   string;
    email:      string;
    phone:      string;
}

export interface CreateUserDTO {
    firstName: string;
    middleName?: string;
    lastName:  string;
    email:     string;
    phone:     string;
    role?:number|null
}

export interface CreateUserResponse {
    id:         number;
    firstName:  string;
    lastName:   string;
    email:      string;
    phone:      string;
    deletedAt?:  null;
    middleName: null;
}

export interface User{
    id:         number;
    firstName:  string;
    middleName?: string|null;
    lastName:   string;
    email:      string;
    phone?:      string|number|null;
}

export interface EditUserDTO {
    id:         number;
    firstName:  string;
    lastName:   string;
    email:      string;
    phone:      string;
    middleName: string|null;
}

export type UserList = User[];
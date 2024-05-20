export interface GetUserByIDDTO {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface GetClassDTO {
  name: string;
  instructor: string;
  description: string;
  schedule: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  };
  capacity: number;
  _id?: string;
}
export interface CreateUserDTO {
  MemberId: string;
  Name: string;
  Gender: string | null;
  Address: string;
  Class: string;
  ContactNo: string;
  Email: string;
  JoinDate?: string;
}

export interface CreateUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  deletedAt?: String | Date;
  middleName?: String;
}

export interface User {
  id: number;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  email: string;
  phone?: string | number | null;
}

export interface EditUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  middleName: string | null;
}

export type UserList = User[];

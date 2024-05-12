import { PaginationMetaDTO } from "./pagination.meta";

export interface APIBaseResponse<t>{
  statusCode:number;
  timeStamp?:string;
  message:string;
  error?:any;
  msg: any,
  data:t,
  meta?:PaginationMetaDTO
}

export interface AuthMEResponseData{
  id:number;
  createdAt?:any;
  updatedAt?:any;
  firstName:string;
  middleName?:string;
  lastName:string;
  email:string;
  phone?:any;
}

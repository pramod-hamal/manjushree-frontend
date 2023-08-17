export interface APIBaseResponse<t,m>{
  statusCode:number;
  timeStamp?:string;
  message:string;
  error?:any;
  data:t,
  meta?:m
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

export interface PaginationMetaDTO{
  limit:number;
  total:number;
  page_total:number;
  total_pages:number;
  next?:number|null,
  previous?:number|null,
  page?:number|null,
}


export interface LoginResponseData{
  accessToken:string
}

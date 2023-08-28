export interface APIBaseResponse<t>{
  statusCode:number;
  timeStamp?:string;
  message:string;
  error?:any;
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

export interface PaginationMetaDTO{
  limit:number;
  total:number;
  page_total:number;
  total_pages:number;
  next?:number|null,
  previous?:number|null,
  page?:number|null,
  onPageChange?:()=>{} |null
}


export interface LoginResponseData{
  accessToken:string
}

import { baseUrl, endpoints } from "@/constants/endpointsleanq_support_coordinator"
import axios from "axios"
import { prepareValidateDomainHeader } from "../getHeaders";

export const validateDomain =async(host:string):Promise<boolean>=>{
 try {
  const response = await axios.get(baseUrl+endpoints.admin.validate,prepareValidateDomainHeader(host));
  if(response.status === 200){
    return true;
  }
  return false;
  } catch (error) {
  return false;
 }
}
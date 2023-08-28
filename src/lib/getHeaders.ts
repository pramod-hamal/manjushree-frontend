import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";

export const getSubDomainFromBaseUrl=()=>{
  const url = baseUrl;
  const parsedUrl = new URL(url);
  const parts = parsedUrl.hostname.split('.');
  const subdomain = parts.slice(0, parts.length - 2).join('.');
  return subdomain;
}

export const prepareAuthHeader=(headers:Headers) => {
   prepareSubDomainHeader(headers)
    const token: string | null = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", "Bearer " + token);
    }
    return;
  }

  export const prepareSubDomainHeader=(headers:Headers) => {
    const subdomain :string = getSubDomainFromBaseUrl()
    headers.set("x-subdomain",subdomain);
    return;
  }

  export const getSubDomain=(url:string)=>{
       const urlObj = new URL(url);
    const hostParts = urlObj.hostname.split('.');
    console.log(hostParts,"getSubDomain")
    
    // If there are more than 2 parts in the hostname, the first part is the subdomain
    if (hostParts.length >= 2) {
        return hostParts[0];
    }
    
    return null; // No subdomain found

  }

  export const prepareValidateDomainHeader=(subDomain:string)=>{
    return {headers:{"x-subdomain":subDomain}}
  }
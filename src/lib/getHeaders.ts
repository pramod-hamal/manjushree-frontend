import { baseUrl } from "@/constants/endpointsleanq_support_coordinator";

export const getSubDomainFromBaseUrl=()=>{
  const url = baseUrl;
  const parsedUrl = new URL(url);
  const parts = parsedUrl.hostname.split('.');
  const subdomain = parts.slice(0, parts.length - 2).join('.');
  return "leanq";
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
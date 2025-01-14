
import { getCookie, CookieValueTypes } from 'cookies-next';

export const prepareSubDomainHeader = (headers: Headers) => {
  const url = window.location.host;
  const subdomain: string | null = getSubDomain(url)
  headers.set("x-subdomain", subdomain!);
}

export const getSubDomain = (url: string): string | null => {
  if (url.includes("localhost")) {
    return "leanq"
  }
  else {
    const hostParts = url.split('.');
    if (hostParts.length >= 2) {
      return hostParts[0];
    }
    return null;
  }
}

export const prepareValidateDomainHeader = (subDomain: string) => {
  return { headers: { "x-subdomain": subDomain } }
}

export const prepareAuthHeader = (headers: Headers) => {
  prepareSubDomainHeader(headers)
  const token: CookieValueTypes = getCookie("token")
  if (token) {
    headers.set("Authorization", "Bearer " + token);
  }
  return;
}

import { getCookie, CookieValueTypes } from 'cookies-next';
import { prepareSubDomainHeader } from './getHeaders';


export const prepareAuthHeader = (headers: Headers) => {
    prepareSubDomainHeader(headers);
    const token: CookieValueTypes = getCookie("token");
    if (token) {
        headers.set("Authorization", "Bearer " + token);
    }
    return;
};

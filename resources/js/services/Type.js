
export const BASE_URL = "http://localhost:8000/";
export const PHONE_REGISTER_URL = "mobile/register";
export const STORE_USER_INFO_URL = "auth/register";
export const VERIFY_MOBILE_URL = "auth/password/token";
export const PASSWORD_RESET_URL = "auth/password/recovery";
export const LOGIN_URL = "auth/login";
export const VERSION = "";
export const REQUEST_URL = `${BASE_URL}${VERSION}`;
export const TIMEOUT = 60000;

export const REQUEST_HEADER_TOKEN = {
    'Access-Control-Allow-Origin': '*',
    'X-Custom-Header': 'foobar',
    // 'Content-Type': 'multipart/form-data',
    'Authentication' : ''
}

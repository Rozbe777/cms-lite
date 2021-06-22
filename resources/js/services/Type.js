
export const BASE_URL = `http://${location.host}/`;
export const BASE_URL_IMG = `http://${location.host}`;
export const PHONE_REGISTER_URL = "mobile/register";
export const STORE_USER_INFO_URL = "auth/register";
export const VERIFY_MOBILE_URL = "mobile/token";
export const PASSWORD_RESET_URL = "auth/password/recovery";
export const PASSWORD_TOKEN_URL = "auth/password/token";
export const LOGIN_URL = "auth/login";
export const VERSION = "";
export const REQUEST_URL = `${BASE_URL}${VERSION}`;
export const TIMEOUT = 60000;
import $ from 'jquery'

// console.log("scrf : " , $('meta[name="csrf-token"]').attr('content'));

export const REQUEST_HEADER_TOKEN = {
    // 'Access-Control-Allow-Origin': '*',
    // 'X-Custom-Header': 'foobar',
    'is_axios' : true,

    'Content-Type': 'application/json',
    // 'Authentication' : ''

}

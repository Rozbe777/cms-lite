export const BASE_URL = `http://${location.host}/`;
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
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    'Accept': 'application/x-www-form-urlencoded',
    // 'X-Custom-Header': 'X-CSRFToken',
    // 'is_axios': true,
    'Content-Type': 'application/json',
    // 'Authentication' : ''

}

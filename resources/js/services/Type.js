export const BASE_URL = `${location.origin}/`;
export const BASE_URL_IMG = `${location.origin}/image`;
export const PHONE_REGISTER_URL = "mobile/register";
export const STORE_USER_INFO_URL = "auth/register";
export const VERIFY_MOBILE_URL = "mobile/token";
export const PASSWORD_RESET_URL = "auth/password/recovery";
export const PASSWORD_TOKEN_URL = "auth/password/token";
export const LOGIN_URL = "auth/login";
export const DEFAULT_ICON = "/images/avatar.png"
export const VERSION = "";
export const REQUEST_URL = `${BASE_URL}${VERSION}`;
export const TOKEN = $('meta[name="csrf-token"]').attr('content');
export const TIMEOUT = 60000;
import $ from 'jquery'

let data_token =  $('meta[name="csrf-token"]').attr('content');

export const REQUEST_HEADER_TOKEN = {
    'Access-Control-Allow-Origin': '*',
    // 'X-Custom-Header': 'foobar',
    // 'is_axios' : true,
    //  'X-XSRF-TOKEN' : data_token,
    'Content-Type': 'application/json',
    'Accept': '*/*;',
    // 'Authentication' : ''

}

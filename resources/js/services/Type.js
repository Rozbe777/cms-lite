
export const BASE_URL = "http://localhost:8000/";
export const VERSION = "";
export const REQUEST_URL = `${BASE_URL}${VERSION}`;
export const TIMEOUT = 60000;

export const REQUEST_HEADER_TOKEN = {
    'Access-Control-Allow-Origin': '*',
    'X-Custom-Header': 'foobar',
    // 'Content-Type': 'multipart/form-data',
    'Authentication' : ''
}

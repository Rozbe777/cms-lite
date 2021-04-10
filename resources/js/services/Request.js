
import * as API from './Type';
import axios from "axios";

export const request = axios.create({
    baseURL: API.BASE_URL,
    timeout: API.TIMEOUT,
    headers: API.REQUEST_HEADER_TOKEN
});

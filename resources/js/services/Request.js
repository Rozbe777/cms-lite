
import * as API from './Type';
import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(
    axios,
    {
        retries: 3,
        retryDelay: API.TIMEOUT
    }
);
export const request = axios.create({
    baseURL: API.BASE_URL,
    timeout: API.TIMEOUT,
    headers: API.REQUEST_HEADER_TOKEN
});

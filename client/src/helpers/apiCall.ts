import axios from 'axios';
import { getCurrentUserToken } from './tokenHelpers';

interface Params {
    url: string;
    headers?: any;
    method: string;
    data?: any;
    restricted?: boolean;
}

export function apiCall(params: Params): any {
    const reqParams: Params = {
        url: params.url,
        headers: {
            'Content-Type': 'application/json',
        },
        method: params.method,
    };

    if (params.headers) {
        for (const [key, value] of Object.entries(reqParams.headers)) {
            reqParams.headers[key] = value;
        }
    }

    if (params.data) {
        reqParams.data = JSON.stringify(params.data);
    }

    if (params.restricted) {
        reqParams.headers['Authorization'] = `Bearer ${getCurrentUserToken()}`;
    }

    return axios(reqParams);
}

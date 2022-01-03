import {create} from 'apisauce';
import { getCookie } from './Cookies'

const endpoint = 'http://192.168.1.108:3030';

const api = create({
    baseURL: endpoint,
    headers: {
        'api-key': 'HVUmJ30txxctqBX9oAPFkeQXLH46TU620N7fwt7UK8ZJQnHeL2CpO6ZevjsLhJo7'
    },
    timeout: 10000
});

api.addAsyncRequestTransform((req) => async () => {
    let sessId = await getCookie("authToken");
    if (sessId) { req.headers["sessionid"] = sessId; }
});

export { api, endpoint };
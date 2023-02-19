import fetch from 'node-fetch';

import endpoints from './helpers/endpoints.js';
import configHeaders from './helpers/headers.js';
import checkAminoAPIStatusCode from './helpers/checkAminoAPIStatusCode.js';
import deviceIdGenerator from './helpers/deviceIdGenerator.js';

import signature from './helpers/signature.js';


export default async function login(email, password) {

    let headers = configHeaders.getHeaders();
    let loginHeaders = JSON.parse(JSON.stringify(headers)); //just cloning headers object base 
    const __deviceID = deviceIdGenerator();

    let body = {
        "email": email,
        "v": 2,
        "secret": `0 ${password}`,
        "deviceID": __deviceID,
        "clientType": 100,
        "action": "normal",
        "timestamp": Date.now()
    };

    loginHeaders["NDC-MSG-SIG"] = signature(JSON.stringify(body));
    loginHeaders["NDCDEVICEID"] = __deviceID;
    loginHeaders["Content-Length"] = JSON.stringify(body).length;

    try {

        let fetchParams = {
            method: 'post',
            body: JSON.stringify(body),
            headers: loginHeaders
        }

        const response = await fetch(endpoints.login, fetchParams);
        const data = await response.json();
        checkAminoAPIStatusCode(data);

        headers["NDCAUTH"] = `sid=${data.sid}`
        headers["NDCDEVICEID"] = __deviceID;

        return {
            headers: headers,
            accountData: data,
        }

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }

}




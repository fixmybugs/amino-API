import fetch from 'node-fetch';
import endpoints from '../helpers/endpoints.js';
import deviceIdGenerator from '../helpers/deviceIdGenerator.js';
import signature from '../helpers/signature.js'
import configHeaders from '../helpers/headers.js';


export default async function login(email, password) {

    let headers = configHeaders.getHeaders()
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

    headers["NDC-MSG-SIG"] = signature(JSON.stringify(body));
    headers["NDCDEVICEID"] = __deviceID;
    headers["Content-Length"] = JSON.stringify(body).length;

    try {

        const response = await fetch(endpoints.login, {
            method: 'post',
            body: JSON.stringify(body),
            headers: headers
        });
        const data = await response.json();
        headers["NDCAUTH"] = `sid=${data.sid}`
        console.log(headers.NDCAUTH);
        return {
            _headers: headers
        }

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import deviceIdGenerator from './helpers/deviceIdGenerator.js';
import signature from './helpers/signature.js'
import configHeaders from './helpers/headers.js';
import checkForExeptions from './exceptions/checkForExceptions.js';


export default async function login(email, password) {

    if(typeof email != 'string' || typeof password != 'string'){
        throw new Error("email and password must be a string");
    }

    let headers = configHeaders.getHeaders()
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

        const response = await fetch(endpoints.login, {
            method: 'post',
            body: JSON.stringify(body),
            headers: loginHeaders
        });

        const data = await response.json();
        checkForExeptions(data);
        headers["NDCAUTH"] = `sid=${data.sid}`
        headers["NDCDEVICEID"] = __deviceID;
        //console.log(data);
        return {
            headers: headers,
            accountData: data,
        }

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }

}




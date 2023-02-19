import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import signature from './helpers/signature.js'
import checkAminoAPIStatusCode from './helpers/checkAminoAPIStatusCode.js';

export default async function sendMessage({

    message,
    chatId,
    communityId,
    headers

}) {
    
    let sendMessageHeaders = JSON.parse(JSON.stringify(headers));

    let body = {
        "type": 0,
        "content": message,
        "clientRefId": parseInt((Date.now() / 1000) / 10 % 1000000000),
        "timestamp": Date.now()
    }


    sendMessageHeaders["NDC-MSG-SIG"] = signature(JSON.stringify(body));
    sendMessageHeaders["Content-Length"] = JSON.stringify(body).length;
    
    try {
        
        const response = await fetch(endpoints.sendChat(communityId, chatId), {
            method: 'post',
            body: JSON.stringify(body),
            headers: sendMessageHeaders
        });
        const data = await response.json();
       // console.log(data)
        checkAminoAPIStatusCode(data);
        return data

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }

}



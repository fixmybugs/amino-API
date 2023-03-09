import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import signature from './helpers/signature.js';
import checkResponseStatus from './helpers/checkResponseStatus.js';

export default async function sendMessage({
    message,
    chatId,
    communityId,
    replyTo,
    headers
}) {

    let sendMessageHeaders = JSON.parse(JSON.stringify(headers));

    let body = {
        "type": 0,
        "content": message,
        "clientRefId": parseInt((Date.now() / 1000) / 10 % 1000000000),
        "timestamp": Date.now()
    }

    if(replyTo) body["replyMessageId"] = replyTo;

    sendMessageHeaders["NDC-MSG-SIG"] = signature(JSON.stringify(body));
    sendMessageHeaders["Content-Length"] = JSON.stringify(body).length;
    
    try {
        
        let endpoint  = endpoints.sendChat(communityId, chatId);
        let fetchParams = {
            method: 'post',
            body: JSON.stringify(body),
            headers: sendMessageHeaders
        };
        const response = await fetch(endpoint, fetchParams);
        const data = await response.json();

        let {success, APIMessage} = checkResponseStatus(data)
        
        if(!success) return Object.freeze({
            data: null,
            success: success,
            errorMessage: APIMessage
        })

        return Object.freeze({
            data: data,
            success: true,
            errorMessage: null
        });

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }

}



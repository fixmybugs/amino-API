import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import signature from './helpers/signature.js'
import checkForExeptions from './exceptions/checkForExceptions.js';
import { v4 as uuidv4 } from 'uuid';

export default async function sendMessage({

    message,
    chatId,
    communityId,
    attached = false,
    headers

}) {

    if (typeof message !== 'string' || message === "") throw new Error('message must be a string');
    if (typeof chatId !== 'string') throw new Error('chatId must be a string');
    if (typeof communityId !== 'number') throw new Error('communityId must be a number');
    if (typeof attached !== 'boolean') throw new Error('attached must be a boolean');
    if (!headers) throw new Error('The "headers" parameter is required');

    let sendMessageHeaders = JSON.parse(JSON.stringify(headers));

    let body = {
        "type": 0,
        "content": message,
        "clientRefId": parseInt((Date.now() / 1000) / 10 % 1000000000),
        "timestamp": Date.now()
    }

    //sendMessageHeaders["AUID"] = uuidv4(); 
    //sendMessageHeaders["SMDEVICEID"] = uuidv4();
    sendMessageHeaders["NDC-MSG-SIG"] = signature(JSON.stringify(body));
    sendMessageHeaders["Content-Length"] = JSON.stringify(body).length;


    //console.log(sendMessageHeaders);
   // console.log(body);

    try {
        
        const response = await fetch(endpoints.sendChat(communityId, chatId), {
            method: 'post',
            body: JSON.stringify(body),
            headers: sendMessageHeaders
        });
        const data = await response.json();
        console.log(data)
        checkForExeptions(data);
        return data

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }

}



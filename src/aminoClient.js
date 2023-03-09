import login from './aminoClientMethods/login.js';
import getJoinedCommunities from './aminoClientMethods/getJoinedComs.js';
import getJoinedChats from './aminoClientMethods/getJoinedChats.js';
import sendMessage from './aminoClientMethods/sendMessage.js';

import aminoMessageListener from './aminoMessageListener/aminoMessageListener.js';

//helpers
import validateParams from './aminoClientHelpers/paramsValidate.js';
import checkIfLoggedIn from './aminoClientHelpers/checkIfLoggedIn.js';

class aminoClient{

    constructor() {
        this.loginStatus;
        this.headers;
        this.myAccountInfo;
    }

    async login({ email, password }) {

        let paramConfig = {
            "email": {
                expectedType: "string",
                required: true,
                value: email
            },
            "password": {
                expectedType: "string",
                required: true,
                value: password
            }
        }
        validateParams(paramConfig);

        let { headers, data, success, errorMessage } = await login(email, password);
        if(!success) return errorMessage

        this.headers = headers;
        this.myAccountInfo = data;
        this.loginStatus = true;

        return data;
    }

    async getJoinedCommunities({ size }) {

        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {
            "size": {
                expectedType: "number",
                required: false,
                value: size
            },
        }
        validateParams(paramConfig);
    
        let getCommunitiesParams = {
            size: size,
            headers: this.headers
        }

        let {data, success, errorMessage} = await getJoinedCommunities(getCommunitiesParams);
        if(!success) return errorMessage
        return data;
    }

    async getJoinedChats({ size, communityId }) {
        
        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {

            "size": {
                expectedType: "number",
                required: false,
                value: size
            },
            "communityId":{
                expectedType: "number",
                required: true,
                value: communityId
            }
        }
        validateParams(paramConfig);

        let getJoinedChatsParams = {

            communityId: communityId,
            size: size,
            headers: this.headers
        }

        let {data, success, errorMessage} = await getJoinedChats(getJoinedChatsParams);
        if(!success) return errorMessage;
        return data;
    }

    async sendMessage({ message, chatId, communityId }) {

        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {
            "message": {
                expectedType: "string",
                required: true,
                value: message,
            },
            "chatId": {
                expectedType: "string",
                required: true,
                value: chatId
            },
            "communityId": {
                expectedType: "number",
                required: true,
                value: communityId
            }
        }
        validateParams(paramConfig);

        let sendMessageParams = {

            message: message,
            chatId: chatId,
            communityId: communityId,
            headers: this.headers
        }

        let {data, success, errorMessage} = await sendMessage(sendMessageParams);
        if(!success) return errorMessage;
        return data;
    }

    async replyToMessage({message, chatId, communityId, replyTo}){

        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {
            "message": {
                expectedType: "string",
                required: true,
                value: message,
            },
            "chatId": {
                expectedType: "string",
                required: true,
                value: chatId
            },
            "communityId": {
                expectedType: "number",
                required: true,
                value: communityId
            },

            "replyTo": {
                expectedType: "string",
                required: true,
                value: replyTo,
            }

        }
        validateParams(paramConfig);

        let sendMessageParams = {

            message: message,
            chatId: chatId,
            communityId: communityId,
            replyTo: replyTo,
            headers: this.headers
        }

        let {data, success, errorMessage} = await sendMessage(sendMessageParams);
        if(!success) return errorMessage;
        return data;
    }
 
    createMessageListener(){

        return new aminoMessageListener({context: this});

    }



}

export default aminoClient;

import login from './aminoClientMethods/login.js';
import getJoinedCommunities from './aminoClientMethods/getJoinedComs.js';
import getJoinedChats from './aminoClientMethods/getJoinedChats.js';
import sendMessage from './aminoClientMethods/sendMessage.js';

import aminoEventListener from './aminoEventListener/aminoEventListener.js';

//helpers
import validateParams from './aminoClientHelpers/paramsValidate.js';
import checkIfLoggedIn from './aminoClientHelpers/checkIfLoggedIn.js';

class aminoClient {

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

        let { headers, data } = await login(email, password);
        this.headers = headers;
        this.myAccountInfo = data;
        this.loginStatus = true;

        return this.loginStatus;
    }

    async getJoinedCommunities({ size, resume }) {
        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {
            "size": {
                expectedType: "number",
                required: false,
                value: size
            },
            "resume":{
                expectedType: "boolean",
                required: false,
                value: resume
            }
        }

        validateParams(paramConfig);
    


        let getCommunitiesParams = {
            size: size,
            resume: resume,
            headers: this.headers
        }

        let communities = await getJoinedCommunities(getCommunitiesParams);
        return communities;
    }

    async getJoinedChats({ size, resume, communityId }) {
        
        checkIfLoggedIn(this.loginStatus);

        let paramConfig = {
            "size": {
                expectedType: "number",
                required: false,
                value: size
            },
            "resume": {
                expectedType: "boolean",
                required: false,
                value: resume
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
            resume: resume,
            headers: this.headers
        }

        let response = await getJoinedChats(getJoinedChatsParams);
        return response;
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

        let data = await sendMessage({ message: message, chatId, communityId, headers: this.headers })
        return data;
    }

    newEventListener() {

        checkIfLoggedIn(this.loginStatus);
        
        return new aminoEventListener({ context: this });
    }

}

export default aminoClient;

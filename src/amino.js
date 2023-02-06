import login from './modules/login.js';
import getJoinedCommunities from './modules/getJoinedComs.js';
import getJoinedChats from './modules/getJoinedChats.js';
import sendMessage from './modules/sendMessage.js';

import chatListener from './modules/chatListener.js';

class aminoClient {

    constructor({email, password}) {

        this.loginStatus=false;
        this.headers;
        this.email = email;
        this.password = password;
        this.myAccountInfo;
    }

    async login() {

        let response = await login(this.email, this.password);
        this.headers = response.headers;
        this.myAccountInfo = response.data;
        this.loginStatus = true;
    }

    async getJoinedCommunities({ size, resume}) {

        if(!this.loginStatus) throw new Error('you need to login first');

        let getCommunitiesParams = {

            size: size,
            resume: resume,
            headers: this.headers
        }
        
        let communities = await getJoinedCommunities(getCommunitiesParams);
        return communities;
    }

    async getJoinedChats({size, resume, communityId }) {
        if(!this.loginStatus) throw new Error('you need to login first');

        let getJoinedChatsParams = {

            communityId: communityId,
            size: size,
            resume: resume,
            headers: this.headers
        }

        let response = await getJoinedChats(getJoinedChatsParams);
        return response;
    }

    async sendMessage({message, chatId, communityId}){
        if(!this.loginStatus) throw new Error('you need to login first');
        await sendMessage({message: message, chatId, communityId, headers: this.headers})

    }

    async startListenMessages(){
        if(!this.loginStatus) throw new Error('you need to login first');

        let newListener = new chatListener(this.headers);
        await newListener.startListen();
        newListener.on("rawMsg", (raw)=>{
            console.log("raw message here: ", raw);
        })
    }

}

export default aminoClient;

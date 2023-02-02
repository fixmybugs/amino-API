import login from './modules/login.js';
import getJoinedCommunities from './modules/getJoinedComs.js';
import getJoinedChats from './modules/getJoinedChats.js';

class aminoClient {

    constructor({email, password}) {
        this.headers;
        this.email = email;
        this.password = password;
        this.myAccountInfo;
    }

    async login() {
        let response = await login(this.email, this.password);
        this.headers = response.headers;
        this.myAccountInfo = response.data;
    }

    async getJoinedCommunities({ size, resume}) {

        let getCommunitiesParams = {

            size: size,
            resume: resume,
            headers: this.headers
        }
        
        let communities = await getJoinedCommunities(getCommunitiesParams);
        return communities;
    }

    async getJoinedChats({size, resume, communityId }) {

        let getJoinedChatsParams = {

            communityId: communityId,
            size: size,
            resume: resume,
            headers: this.headers
        }

        let response = await getJoinedChats(getJoinedChatsParams);
        return response;
    }

}

export default aminoClient;

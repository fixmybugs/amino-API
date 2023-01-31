
//loading modules
import login from './src/modules/login.js';
import getJoinedCommunities from './src/modules/getJoinedComs.js';
import getJoinedChats from './src/modules/getJoinedChats.js';

class aminoClient {
    
    constructor() {
        this.headers;

    }

    async login(email, pass) {
        let response = await login(email, pass);
        if (!response.success) {
            console.error("something bad happen");
        }
        this.headers = response.headers;
    }

    async getJoinedComs({ size, resume }) {

        let getCommunitiesParams = {

            size: size,
            resume: resume,
            headers: this.headers
        }

        let communities = await getJoinedCommunities(getCommunitiesParams);
        return communities;
    }

    async getJoinedChats({ communityId, size, resume }) {

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

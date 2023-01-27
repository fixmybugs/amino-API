import eventEmitter from 'events';

//loading modules
import login from './src/modules/login.js';
import getJoinedCommunities from './src/modules/getJoinedComs.js';
import getJoinedChats from './src/modules/getJoinedChats.js';

class aminoClient extends eventEmitter {
    constructor(){
        super();
        this.headers;

    }
    async login(email, pass){
        let response = await login(email, pass);
        if(!response.success){
            console.error("something bad happen");
        }
        this.headers = response.headers;
    }

    async getJoinedComs(){
        let response = await getJoinedCommunities(50, this.headers);
        return response;
    }

    async getJoinedChats(communityId){
        let response = await getJoinedChats(this.headers, communityId, 50);
        return response;
    }
    
}

export default aminoClient;
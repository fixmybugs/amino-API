import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import resumeChatListData from './summarizers/joinedChatResume.js';

export default async function getJoinedChats({size = 50, communityId,  resume = true, headers}) {

    if(!communityId) throw new Error('communityId required');

    if (typeof communityId != 'number' || typeof size != 'number' || typeof headers != 'object') {
        throw new Error('All Arguments are not satisfied.');
    }

    try {

        const response = await fetch(endpoints.getJoinedChats(communityId, size), {
            method: 'get',
            headers: headers
        });
        const data = await response.json();
        if(resume){

            return resumeChatListData({data: data.threadList});
        }
        return data.threadList;

    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}

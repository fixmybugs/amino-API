import fetch from 'node-fetch';
import endpoints from '../helpers/endpoints.js';

export default async function getJoinedCommunities(headers, communityId, size=50) {

    //console.log("current headers => ", headers);

  try {

        const response = await fetch(endpoints.getJoinedChats(communityId, size), {
            method: 'get',
            headers: headers
        });
        const data = await response.json();
        return data;
    
    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
import fetch from 'node-fetch';
import endpoints from '../helpers/endpoints.js';

export default async function getJoinedChats({size = 50, communityId,  formatted = true, headers}) {

    console.log('current size in getJoinedChats ', size);
    if (typeof communityId != 'number' || typeof size != 'number' || typeof headers != 'object') {
        throw new Error('All Arguments are not satisfied.');
    }

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

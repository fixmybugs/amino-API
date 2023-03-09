import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import { sortJoinedChats } from './helpers/sorters.js';
import checkResponseStatus from './helpers/checkResponseStatus.js';

export default async function getJoinedChats({ size = 50, communityId, headers }) {

    let getJoinedChatsHeaders = JSON.parse(JSON.stringify(headers));

    try {

        let fetchParams = {
            method: 'get',
            headers: getJoinedChatsHeaders
        }

        let endpoint = endpoints.getJoinedChats(communityId, size);

        const response = await fetch(endpoint, fetchParams);
        const data = await response.json();
        
        let { success, APIMessage} = checkResponseStatus(data);
        if(!success) return Object.freeze({
            data: null,
            success: success,
            errorMessage: APIMessage
        });

       // let dataSorted = sortJoinedChats(data.threadList);
        return Object.freeze({
            data: data.threadList,
            success: true,
            errorMessage: null
        });

    } catch (error) {
        throw new Error(`something bad happened => ${error}`)
    }
}

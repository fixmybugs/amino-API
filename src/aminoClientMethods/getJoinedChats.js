import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import { summarizeJoinedChats } from './helpers/summarizers.js';
import checkAminoAPIStatusCode from './helpers/checkAminoAPIStatusCode.js';

export default async function getJoinedChats({ size = 50, communityId, resume = true, headers }) {

    let getJoinedChatsHeaders = JSON.parse(JSON.stringify(headers));

    try {

        let fetchParams = {
            method: 'get',
            headers: getJoinedChatsHeaders
        }

        let endpoint = endpoints.getJoinedChats(communityId, size);

        const response = await fetch(endpoint, fetchParams);
        const data = await response.json();
        checkAminoAPIStatusCode(data);

        let dataSummary = summarizeJoinedChats(data.threadList);
        if (resume) return Object.freeze(dataSummary);
        return Object.freeze(data.threadList);

    } catch (error) {
        throw new Error(`something bad happened => ${error}`)
    }
}

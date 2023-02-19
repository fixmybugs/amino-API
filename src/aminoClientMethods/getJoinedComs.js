import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import { summarizeJoinedCommunities } from './helpers/summarizers.js';
import checkAminoAPIStatusCode from './helpers/checkAminoAPIStatusCode.js';

export default async function getJoinedCommunities({ size = 50, resume = true, headers }) {

    let getJoinedComsHeaders = JSON.parse(JSON.stringify(headers));

    try {

        let endpoint = endpoints.getJoinedComs(size);
        let fetchParams = {
            method: 'get',
            headers: getJoinedComsHeaders
        }

        const response = await fetch(endpoint, fetchParams);
        const data = await response.json();
        checkAminoAPIStatusCode(data);

        if (resume) return summarizeJoinedCommunities(data.communityList);
        return data.communityList;

    } catch (error) {
        throw new Error(`something bad happened => ${error}`);
    }


}
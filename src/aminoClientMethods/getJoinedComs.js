import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import { sortJoinedCommunities } from './helpers/sorters.js';
import checkResponseStatus from './helpers/checkResponseStatus.js';

export default async function getJoinedCommunities({ size = 50, headers }) {

    let getJoinedComsHeaders = JSON.parse(JSON.stringify(headers));

    try {

        let endpoint = endpoints.getJoinedComs(size);
        let fetchParams = {
            method: 'get',
            headers: getJoinedComsHeaders
        }

        const response = await fetch(endpoint, fetchParams);
        const data = await response.json();
        let {success, APIMessage} = checkResponseStatus(data);
        if(!success) return Object.freeze({
            data: null,
            success: success,
            errorMessage: APIMessage
        })

        return Object.freeze({
            data: data.communityList,
            success: true,
            errorMessage: APIMessage
        });

    } catch (error) {
        throw new Error(`something bad happened => ${error}`);
    }


}
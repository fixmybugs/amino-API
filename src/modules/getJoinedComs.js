import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import resumeData from './summarizers/joinedComsResume.js'
import checkForExeptions from './exceptions/checkForExceptions.js';

export default async function getJoinedCommunities({ size = 50, resume = true, headers }) {

    if (typeof size != 'number' || typeof headers != 'object' || typeof resume != 'boolean') {
        throw new Error('All Arguments are not satisfied.');
    }

    let comHeaders = JSON.parse(JSON.stringify(headers));

    try {

        const response = await fetch(endpoints.getJoinedComs(size), {
            method: 'get',
            headers: comHeaders
        });

        const data = await response.json();
        checkForExeptions(data)

        if (resume) {
            return resumeData({ data: data.communityList });
        }
        return data.communityList;


    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
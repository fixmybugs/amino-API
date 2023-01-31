import fetch from 'node-fetch';
import endpoints from './helpers/endpoints.js';
import resumeData from './summarizers/joinedComsResume.js'

export default async function getJoinedCommunities({ size = 50, resume = true, headers }) {

    if (typeof size != 'number' || typeof headers != 'object' || typeof resume != 'boolean') {
        throw new Error('All Arguments are not satisfied.');
    }

    let comHeaders = headers;

    try {

        const response = await fetch(endpoints.getJoinedComs(size), {
            method: 'get',
            headers: comHeaders
        });
        
        const responseData = await response.json();
        
        if(resume){
            return resumeData({data: responseData.communityList});
        }
        return responseData.communityList;


    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
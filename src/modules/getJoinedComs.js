import fetch from 'node-fetch';
import endpoints from '../helpers/endpoints.js';

export default async function getJoinedCommunities(size=50, headers) {
    
    if(typeof size != 'number' || typeof headers != 'object'){
        throw new Error("size must be a number and headers must be an object");
    }
    
    let comHeaders = headers;

  try {

        const response = await fetch(endpoints.getJoinedComs(size), {
            method: 'get',
            headers: comHeaders
        });
        const data = await response.json();
        return data.communityList;
    
    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
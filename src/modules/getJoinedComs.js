import fetch from 'node-fetch';
import endpoints from '../helpers/endpoints.js';

export default async function getJoinedCommunities(size=50, headers) {

    console.log("current headers => ", headers);

  try {

        const response = await fetch(endpoints.getJoinedComs(size), {
            method: 'get',
            headers: headers
        });
        const data = await response.json();
        console.log(data);
    
    } catch (error) {
        console.error("vete alv something bad happen !!", error);
    }


}
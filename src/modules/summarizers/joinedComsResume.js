
export default function joinedCommunitiesResume({data}){

    if(typeof data !== 'object'){
        throw new Error('data must be an array of objects with amino communities response');
    }

    let resumeOfCommunities = data.map((element)=> {
        return {
            name: element.name,
            link: element.link,
            icon: element.icon,
            communityId: element.ndcId,

        }
    })

    return resumeOfCommunities;
}

export default function getJoinedChatResume({data}){
    
    if(typeof data != 'object'){
        throw new Error('data must be an Array of objects with amino chats data');
    }

    let resumeOfChats = data.map((chat)=>{

        let type = '';
        switch(chat.type){
            case 0: type = 'DM';
            break;

            case 1: type = 'private';
            break;
            
            case 2: type = 'public';
            break;
        }

        return {
            
            title: chat.title,
            chatId: chat.threadId,
            membersCount: chat.membersCount,
            joined: chat.membershipStatus == 1 ? true : false,
            description: chat.content,
            type: type,
            icon: chat.icon,
            author: chat.author,
            communityId: chat.ndcId
        }

    })

    return resumeOfChats;

}

export default function getJoinedChatResume({data}){
    
    if(typeof data != 'object'){
        throw new Error('data must be an Array of objects with amino chats data');
    }

    let resumeOfChats = data.map((chat)=>{

        let typeOfChat = {
            0: 'DM',
            1: 'private',
            2: 'public'
        }

        return {
            
            title: chat.title,
            chatId: chat.threadId,
            membersCount: chat.membersCount,
            joined: chat.membershipStatus == 1 ? true : false,
            description: chat.content,
            type: typeOfChat[chat.type],
            icon: chat.icon,
            author: chat.author,
            communityId: chat.ndcId
        }

    })

    return resumeOfChats;

}
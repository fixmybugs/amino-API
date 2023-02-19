
export class messageClass {

    constructor({
        mainAminoContext,
        incomingMessageInfo,
    }) {

       
        this.allInfo = incomingMessageInfo.chatMessage;
        this.communityId = incomingMessageInfo.ndcId;

        let {threadId, messageId, content, author} = this.allInfo; 
        this.threadId = threadId;
        this.messageId = messageId;
        this.content = content;
        this.author = author;
        if(this.authorInfo) this.nickname = this.author.nickname;
         
        this.amino = mainAminoContext;
        
        this.headers = this.headers = JSON.parse(JSON.stringify(mainAminoContext.headers));

    }


    async reply(message) {

        if (typeof message != 'string') throw new Error("Message must be a non-empty string");

        let sendMessageParams = {

            message: message,
            chatId: this.threadId,
            communityId: this.communityId,
            headers: this.headers
        }

        let response = await this.amino.sendMessage(sendMessageParams);
        return response;
    }

    info(){
        return this.allInfo;
    }

}
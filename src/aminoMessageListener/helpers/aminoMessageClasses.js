
export class messageClass {

    constructor({
        mainAminoContext,
        incomingMessageInfo,
    }) {

       
        this.info = incomingMessageInfo.chatMessage;
        this.communityId = incomingMessageInfo.ndcId;

        let {threadId, messageId, content, author} = this.info; 
        this.threadId = threadId;
        this.messageId = messageId;
        this.content = content;
        this.author = author;
        if(this.authorInfo) this.nickname = this.author.nickname;
         
        this.amino = mainAminoContext;
        this.headers = this.headers = JSON.parse(JSON.stringify(mainAminoContext.headers));

    }


    async reply(message) {

        let sendMessageParams = {
            message: message,
            chatId: this.threadId,
            communityId: this.communityId,
            replyTo: this.messageId,
            headers: this.headers
        }

        let response = await this.amino.replyToMessage(sendMessageParams);
        return response;
    }

}
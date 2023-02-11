
export class messageClass {

    constructor({
        mainAminoContext,
        incomingMessageInfo,
    }) {

        this.allInfo = incomingMessageInfo.chatMessage;
        this.communityId = incomingMessageInfo.ndcId;

        this.chatId = this.allInfo.threadId;
        this.Id = this.allInfo.messageId;
        this.content = this.allInfo.content;

        this.authorInfo = this.allInfo.author;
        this.authorNickname = this.authorInfo.nickname;
        
        this.amino = mainAminoContext;
        this.headers = this.headers = JSON.parse(JSON.stringify(mainAminoContext.headers));

    }


    async reply(message) {

        if (typeof message != 'string') throw new Error("Message must be a non-empty string");

        let sendMessageParams = {

            message: message,
            chatId: this.chatId,
            communityId: this.communityId,
            headers: this.headers
        }

        let response = await this.amino.sendMessage(sendMessageParams);
        return response;
    }
}
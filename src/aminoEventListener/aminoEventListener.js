import eventEmitter from 'events';

import aminoSocket from "./socket/aminoSocket.js";
import aminoSocketEventSorter from './helpers/aminoEventSorter.js';
import { messageClass } from './helpers/aminoMessageClasses.js';

export default class chatEventListener extends eventEmitter {

    constructor({context}) {
        super();
        this.amino = context;
        this.headers = JSON.parse(JSON.stringify(context.headers));
    }

    async start() {
        
        let aminoSocketConnection  = new aminoSocket(this.headers);
        aminoSocketConnection.startSocket();
        aminoSocketConnection.on("rawMessage", (messageData)=>{

            let messageClassParams = {
                mainAminoContext: this.amino,
                incomingMessageInfo: messageData
            }
            let eventType = aminoSocketEventSorter(messageData);

            this.emit(eventType, new messageClass(messageClassParams));
        })
    }

} 
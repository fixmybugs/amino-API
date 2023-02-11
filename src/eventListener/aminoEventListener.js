import eventEmitter from 'events';

import aminoSocket from "./socket/aminoSocket.js";
import aminoSocketEventSorter from './eventListenerHelpers/aminoEventSorter.js';
import { messageClass } from './eventListenerHelpers/aminoMessageClasses.js';

export default class chatEventListener extends eventEmitter {
    constructor({amino}) {
        super();
        this.amino = amino;
        this.headers = JSON.parse(JSON.stringify(amino.headers));
    }

    async startListenEvents() {
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
import eventEmitter from 'events';

import aminoSocket from "./socket/aminoSocket.js";

import aminoSocketEventSorter from './helpers/aminoEventSorter.js';
import { messageClass } from './helpers/aminoMessageClasses.js';

export default class chatEventListener extends eventEmitter {

    constructor({ context }) {
        super();
        this.amino = context;
        this.headers = JSON.parse(JSON.stringify(context.headers));
        this.aminoSocketConnection;

    }

    start() {

        this.aminoSocketConnection = new aminoSocket(this.headers);
        this.aminoSocketConnection.startSocket();
        this.aminoSocketConnection.on("rawMessage", (messageData) => {

            let messageClassParams = {
                mainAminoContext: this.amino,
                incomingMessageInfo: messageData
            }

            let eventType = aminoSocketEventSorter(messageData);

            this.emit(eventType, new messageClass(messageClassParams));
        })
    }

    send(data){
        this.aminoSocketConnection.send(data);
    }

} 


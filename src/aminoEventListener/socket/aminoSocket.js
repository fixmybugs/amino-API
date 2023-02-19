import WebSocket from 'ws';
import eventEmitter from 'events';
import socketEndpoints from './socketHelpers/aminoSocketEndpoints.js';
import signature from './socketHelpers/signature.js';


import { randomInt } from './socketHelpers/aminoSocketHelpers.js';


export default class aminoSocket extends eventEmitter {

    constructor(headers) {
        super();
        this.webSocket;
        this.heartbeatSenderId;
        this.headers = JSON.parse(JSON.stringify(headers));
    }

    startHeartbeatSender() {    

        const TIMETOHEARTBEAT = randomInt({ min: 30, max: 50 }) * 1000;

        this.heartbeatSenderId = setInterval(() => {

            let heartbeatData = JSON.stringify({
                "o": {
                    "threadChannelUserInfoList": [],
                    "id": randomInt({ min: 1, max: 100 })
                },
                "t": 116
            })
           // console.log("i send heartbeat: ", heartbeatData);
            this.webSocket.send(heartbeatData);

        }, TIMETOHEARTBEAT);
    }

    stopHeartbeatSender() {
        clearInterval(this.heartbeatSenderId);
    }

    startSocket() {

        let signbody = `${this.headers['NDCDEVICEID']}|${Date.now()}`;
        let finalSignBody = `${signbody.replace('|', '%7C')}`

        this.headers['NDC-MSG-SIG'] = signature(signbody);


        try {

            const SOCKETVERSION = randomInt({ min: 1, max: 4 });
            this.webSocket = new WebSocket(socketEndpoints.webSocket(finalSignBody, SOCKETVERSION), {
                headers: this.headers
            });

            this.webSocket.on("open", () => {

                console.log("Amino socket connected! 🦆");
                this.startHeartbeatSender();

            });

            this.webSocket.on("message", (msg) => {

                let message = JSON.parse(msg);
                if (message.t !== 1000) return;

                let messageData = message.o;
                
                this.emit("rawMessage", messageData);
                
            });

            return this.webSocket;

        } catch (error) {
            console.error('Fck!!! Error in webSocket => ', error);
        }

    }

    closeWebSocket() {
        this.webSocket.terminate();
        this.stopHeartbeatSender();

    }
}


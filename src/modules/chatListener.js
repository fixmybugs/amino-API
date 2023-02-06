
import WebSocket from 'ws';
import EventEmitter from 'events';
import endpoints from './helpers/endpoints.js';
import signature from './helpers/signature.js';


export default class aminoSocket extends eventEmitter {
    constructor(headers) {
        super();
        this.webSocketOne;
        this.headers = JSON.parse(JSON.stringify(headers));
    }

    startOne() {

        let signbody = `${headers.deviceID}|${Date.now()}`;
        let finalSignBody = `${signbody.replace('|', '%7C')}`

        this.headers['NDC-MSG-SIG'] = signature(signbody);

        try {
            console.log(this.headers);
            this.webSocketOne = new WebSocket(endpoints.webSocket(finalSignBody), {
                headers: this.headers
            });

            this.pingerOne = setInterval(() => {
                this.webSocketOne.ping();
            }, 15000);

            this.wsc.on("open", () => {
                console.log("Amino SocketOne started :^)");
            })

            this.wsc.on("close", () => {
                console.log("socketOne cerrado correctamente");
            })

            this.wsc.on("message", (msg) => {
                const message = JSON.parse(msg);
                if (message.t === 1000) {
                    this.emit('rawMsg', message.o.chatMessage);
                    console.log(message);
                }
            });

            return this.wsc;

        } catch (error) {
            throw new Error('Fck!!! Error in webSocket => ', error );
        }

    }
/*
    closeOne() {
        clearInterval(this.pingerOne);
        this.wsc.close();
    }

    startTwo() {

        try {
            this.wscTwo = new WebSocket(`wss://ws4.narvii.com/`, {

                //headers: headers
                headers: {
                    'Accept-Encoding': 'gzip',
                    "Accept-Language": "en-US",
                    "Connection": "Keep-Alive",
                    "Content-Type": "application/json; charset=utf-8",
                    'Upgrade': 'websocket',
                    'Host': 'ws4.narvii.com',
                    'user-agent': userAgent,
                    'NDCDEVICEID': deviceID,
                    'NDCAUTH': `sid=${this.sid}`,
                    'AUID': this.uuid,
                    "NDC-MSG-SIG": sig
                }
            });

            this.pingerTwo = setInterval(() => {
                this.wscTwo.ping('ping');
            }, 15000);

            this.wscTwo.on("open", () => {
                console.log("Amino SocketTwo started :^)");
            })

            this.wscTwo.on("close", () => {
                console.log("socketTwo cerrado correctamente");
            })

            this.wscTwo.on("message", (msg) => {

                const message = JSON.parse(msg);

                if (message.t === 1000) {
                    this.emit('rawMsg', message.o.chatMessage);
                }
            });

            return this.wscTwo;
        } catch (error) {
            console.log('Error al intentar abrir ws en wsTwo', error);
            this.startTwo();
        }

    }


    closeTwo() {
        clearInterval(this.pingerTwo);
        this.wscTwo.close();
    }

    startListen() {
        let that = this;

        this.on('rawMsg', (rawMessage) => {
            if (that.queue.includes(rawMessage.messageId)) {
                return;
            }

            that.queue.push(rawMessage.messageId);
            that.emit('message', rawMessage);

            if (that.queue.length > 50) {
                that.queue.shift();
            }
        });

        this.startOne();
        let switcher = true;

        setTimeout(function resetSocket() {
            if (switcher) {
                that.startTwo();
                setTimeout(() => {
                    that.closeOne();
                    switcher = false;
                }, 4000);
            } else {
                that.startOne();
                setTimeout(() => {
                    that.closeTwo();
                    switcher = true;
                }, 4000)
            }

            setTimeout(resetSocket, 480000);
        }, 480000);

    } */
}


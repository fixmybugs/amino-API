
import WebSocket from 'ws';
import eventEmitter from 'events';
import endpoints from './helpers/endpoints.js';
import signature from './helpers/signature.js';


export default class aminoSocket extends eventEmitter {

    constructor(headers) {
        super();
        this.firstWebSocket;
        this.secondWebSocket;
        this.loopId;
        this.headers = JSON.parse(JSON.stringify(headers));
    }

    openFirstSocket() {

        let signbody = `${this.headers['NDCDEVICEID']}|${Date.now()}`;
        let finalSignBody = `${signbody.replace('|', '%7C')}`

        this.headers['NDC-MSG-SIG'] = signature(signbody);


        try {

            this.firstWebSocket = new WebSocket(endpoints.webSocket(finalSignBody), {
                headers: this.headers
            });
/*
            this.firstWebSocket.on("open", () => {
                console.log("Amino Socket one open!");
            })

            this.firstWebSocket.on("close", () => {
                console.log("Amino Socket one closed!");
            })
*/
            this.firstWebSocket.on("message", (msg) => {
                const message = JSON.parse(msg);
                 if (message.t === 1000) {
                     this.emit('rawMsg', message.o.chatMessage);
                    // console.log(message);
                 }
            });

            return this.firstWebSocket;

        } catch (error) {
            console.error('Fck!!! Error in webSocket => ', error);
        }

    }

    closeFirstSocket() {
        this.firstWebSocket.close(1000);
    }

    openSecondSocket() {

        let signbody = `${this.headers['NDCDEVICEID']}|${Date.now()}`;
        let finalSignBody = `${signbody.replace('|', '%7C')}`

        this.headers['NDC-MSG-SIG'] = signature(signbody);

        try {

            this.secondWebSocket = new WebSocket(endpoints.webSocket(finalSignBody), {
                headers: this.headers
            });
/*
            this.secondWebSocket.on("open", () => {
                console.log("Amino socket two open!");        
            })

            this.secondWebSocket.on("close", () => {
                console.log("Amino socket two closed!");
            })
*/
            this.secondWebSocket.on("message", (msg) => {
                const message = JSON.parse(msg);
                if (message.t === 1000) {
                     this.emit('rawMsg', message.o.chatMessage);
//console.log(message);
                 }
            });

            return this.secondWebSocket;

        } catch (error) {
            console.error('Fck!!! Error in webSocket 2 => ', error);
        }

    }

    closeSecondSocket() {
        this.secondWebSocket.close(1000);
    }

    async startListen(){
        
        let socketChanger = true;
        let timeToChangeBetweenSockets = 360000;
        let that = this;
        this.openFirstSocket();
        this.loopId = setInterval(()=>{  
        
            if(socketChanger){
                console.log("pasé por aquí mijin step01 ");
                that.openSecondSocket();
                socketChanger = false;
                setTimeout(()=>{
                    console.log("cerré el primer socket despues de 8 segundos step02");
                    that.closeFirstSocket();
                }, 8000);

            }else{
                console.log("el estado de socketChanger es: ", socketChanger);
                that.openFirstSocket();
                socketChanger = true;
                setTimeout(()=>{
                    that.closeSecondSocket();
                }, 8000);

            }

        }, timeToChangeBetweenSockets);

    }

    stopListen(){
        clearInterval(this.loopId);
    }
}


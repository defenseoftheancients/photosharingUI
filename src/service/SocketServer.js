import SockJS from "sockjs-client";
import { over } from "stompjs";
class SocketServer {

    constructor(EndPoint) {
        this.stompClient = null;
        this.Sock = new SockJS(EndPoint);
    }
    connect = (onConnected, onError) => {
        this.stompClient =  over(this.Sock);
        this.stompClient.connect({}, onConnected, onError);
    }
    subscribe = (url, callback) => {
        this.stompClient.subscribe(url, callback);
    }
   
    send = (url, header, body) => {
        this.stompClient.send(url, header, body);
    }
    
   
}
export default SocketServer;
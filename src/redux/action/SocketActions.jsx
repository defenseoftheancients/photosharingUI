import { SocketActionTypes } from "../constant/SocketActionTypes";

export const setSocketServer = (socketServer) => ({
    type: SocketActionTypes.CONNECT_SOCKET_SERVER,
    payload: {
        socketServer
    }
})
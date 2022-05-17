import { SocketActionTypes } from "../constant/SocketActionTypes"

const initialState = {
    socketServer: null,
    connected: false
}

export const SocketReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case SocketActionTypes.CONNECT_SOCKET_SERVER:
    return { ...state, socketServer : payload.socketServer, connected: true }

  default:
    return state
  }
}

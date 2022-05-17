import { combineReducers } from "redux";
import { PageReducer } from "./PageReducer";
import { PhotoReducer, selectedProductReducer } from "./PhotoProducer";
import { UserReducer } from "./UserReducer";
import { FileReducer } from "./FileReducer";
import { SocketReducer } from "./SocketReducer";
import { NotificationReducer } from "./NotificationReducer";
export const reducers = combineReducers({
   Photos: PhotoReducer,
   Photo: selectedProductReducer,
   Page: PageReducer,
   User: UserReducer,
   File: FileReducer,
   Socket: SocketReducer,
   Notification: NotificationReducer
});
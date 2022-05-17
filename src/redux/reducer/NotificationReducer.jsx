import { NotificationTypes } from "../constant/NotificationTypes";

const initialState = {
    notifications: []
};

export const NotificationReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case NotificationTypes.STACK_NOTIFICATIONS: {
            const notifications = payload.notifications.concat([...state.notifications]);
            return { ...state, notifications : notifications };
        }
       
        case NotificationTypes.PUSH_NOTIFICATION:
            const notifications = [...state.notifications];
            notifications.unshift(payload.notification);
            return { ...state, notifications : notifications };
        case NotificationTypes.SEEN_NOTIFICATION:
            let oldNotification = [...state.notifications].find(notification=>notification.id === payload.notification.id);
            oldNotification = payload.notification;
            return { ...state};
        case NotificationTypes.REMOVE_NOTIFICATION:
            return { notifications : [] };
        default:
            return state;
    }
};

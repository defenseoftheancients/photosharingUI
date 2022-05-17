import { NotificationTypes } from "../constant/NotificationTypes";

export const stackNotifications = (notifications) => ({
    type: NotificationTypes.STACK_NOTIFICATIONS,
    payload: {
        notifications,
    },
});

export const pushNotifications = (notification) => ({
    type: NotificationTypes.PUSH_NOTIFICATION,
    payload: {
        notification,
    },
});

export const seenNotification = (notification) => ({
    type: NotificationTypes.SEEN_NOTIFICATION,
    payload: {
        notification,
    },
});

export const removeNotifications = () => ({
    type: NotificationTypes.REMOVE_NOTIFICATION,
    payload: {},
});

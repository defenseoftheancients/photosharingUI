import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import { removeNotifications, seenNotification, stackNotifications } from "../../redux/action/NotificationActions";
import NotificationService from "../../service/NotificationService";
import SYSTEM_URL from "../../util/urls";
const NotificationIcon = () => {
    const notifications = useSelector((state) => state.Notification.notifications);
    const currentUser = useSelector((state) => state.User);
    const navigate = useNavigate();
    const notificationDispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);
    const toggle = () => {
        setOpen(!isOpen);
    };
    const handleReadNotification = async (notification) => {
        if (!notification.isRead) {
            const response = await NotificationService.setSeenNotification(
                currentUser,
                notification,
                SYSTEM_URL.NOTIFICATION_API_URL(currentUser.user.userDTO.id, notification.id)
            );
         
            if (response.status === 200) {
                notificationDispatch(seenNotification(response.data));
                window.location.href = notification.objecturl.substring(21);
            }
            else if(response.status === 404) 
                navigate("/home")
        }
        else {
            window.location.href = notification.objecturl.substring(21);
        }
    };

    const fetchNotification = async () => {
        const response = await NotificationService.getNotifications(currentUser, SYSTEM_URL.NOTIFICATION_API_URL(currentUser.user.userDTO.id));

        if (response.status === 200) {
            notificationDispatch(stackNotifications(response.data));
        } else if (response.status === 401) {
        }
    };

    useEffect(() => {
        if (currentUser.isAuthUser) {
            fetchNotification();
        }
        return () => {
            notificationDispatch(removeNotifications());
        };
    }, [currentUser]);

    return (
        <div className="header-notification">
            <Dropdown isOpen={isOpen} toggle={toggle} className="position-static">
                <DropdownToggle className="notification-active bg-transparent border-0 shadow-none">
                    <ion-icon name="notifications-outline"></ion-icon>
                    <span>{notifications.filter((notification) => notification.isRead === false).length}</span>
                </DropdownToggle>

                <DropdownMenu className="notification-dropdown border-0">
                    <div className="notifications">
                        {notifications.length === 0 ? <p>Không có thông báo nào</p>  :  notifications.map((notification) => {
                            return (
                                <div key={new Date() + Math.random()} className="notification" onClick={() => handleReadNotification(notification)}>
                                    <div className="notification-left">
                                        <img src={require("../../assets/image/user1.jpg")} alt="" />
                                    </div>
                                    <div className="notification-right">
                                        <div className="notification-content">{notification.content}</div>
                                        <div className="notification-time">{new Date(notification.timesent).toLocaleString()}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default NotificationIcon;

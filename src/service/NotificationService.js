import axios from "axios";

class NotificationService {
    likeNotification(currentUser, receiver, action, url) {
        return {
            sender: currentUser.userDTO,
            receiver: receiver.owner === undefined ? receiver.userDTO : receiver.owner,
            content: `${currentUser.userDTO.username} thích ảnh của bạn`,
            attach: receiver.photo === undefined ? receiver.photoDTO : receiver.photo,
            activitytype: action,
            objecturl: url,
        };
    }
    commentNotification(currentUser, receiver, comment, action, url) {
        return {
            sender: currentUser.userDTO,
            receiver: receiver.owner === undefined ? receiver.userDTO : receiver.owner,
            content: `${currentUser.userDTO.username} đã bình luận về ảnh của bạn`,
            comment: {
                content: comment,
                parentId: null,
                author: currentUser.userDTO,
            },
            attach: receiver.photo === undefined ? receiver.photoDTO : receiver.photo,
            activitytype: action,
            objecturl: url,
        };
    }

    followNotification(currentUser, receiver, action, url) {
        return {
            sender: currentUser.userDTO,
            receiver: receiver.owner === undefined ? (receiver.userDTO  === undefined ? receiver: receiver.userDTO) : receiver.owner,
            content: `${currentUser.userDTO.username} đã theo dõi bạn`,
            activitytype: action,
            objecturl: url,
        };
    }

    async getNotifications(currentUser, url) {
        const response = await axios
            .get(url, {
                headers: {
                    Authorization: "Bearer " + currentUser.user.accessToken,
                },
            })
            .then((response) => response)
            .catch((e) => {
                // console.log("Error", e);
                return e;
            });
        return response;
    }
    async setSeenNotification(currentUser, notification, url) {
        const formData = new FormData();
        formData.append("jsonNotification", JSON.stringify(notification));
       
        const response = await axios
            .put(url, notification, {
                headers: {
                    Authorization: "Bearer " + currentUser.user.accessToken,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response)
            .catch((e) => {
                console.log(e);
                return e.response;
                // return e;
               
            });
        return response;
    }
}
export default new NotificationService();



const SYSTEM_URL = {
    AUTHENTICATION_API_URL: "http://localhost:8081/photosharing/api/auth",
    USER_API_URL: "http://localhost:8081/photosharing/api/users/",
    PHOTO_API_URL: (userid) => {
        if(!userid)
            return "http://localhost:8081/photosharing/api/photos"
        return `http://localhost:8081/photosharing/api/users/${userid}/photos`;
    },
    NOTIFICATION_API_URL: (userid, notificationid = null) => {
        if(notificationid !== null)
            return `http://localhost:8081/photosharing/api/users/${userid}/notifications/${notificationid}`;
        return `http://localhost:8081/photosharing/api/users/${userid}/notifications`;
    },
    COMMENT_API_URL: (photoid) => {
        return `http://localhost:8081/photosharing/api/photos/${photoid}/comments`;
    },
    OBJECT_DETECTION_URL: "https://object-detection.now.sh/api/predict",
    STOMP_END_POINT: "http://localhost:8081/photosharing/reaction"
}
export default SYSTEM_URL;
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PhotoService from "../../service/PhotoService";
import { useSelector } from "react-redux";
import NotificationService from "../../service/NotificationService";
import { UserAction } from "../../util/UserAction";
const PhotoGridSingle = ({ data }) => {
    const socket = useSelector((state) => state.Socket);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.User);
    const sendLikeNotification = (e, action) => {
        e.stopPropagation();
        if (currentUser.isAuthUser) {
            const likeNotification = NotificationService.likeNotification(currentUser.user, data, action, window.location.href + `photo/${data.photoDTO.id}`);
            socket.socketServer.send("/app/private-like", {}, JSON.stringify(likeNotification));
        } else navigate("/login");
    };
    const handleClick = (e) => {
        window.open("http://localhost:3000/photo/" + data.photoDTO.id, "_blank");
    };
    return (
        <div className={"photogrid-image"}>
            <img src={data.photoDTO.path} alt={data.photoDTO.id} />
            <div className="overlay" onClick={(e) => handleClick(e)}>
                <div className="overlay-content">
                    <Link
                        to={`/profile/${data.userDTO.id}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${data.userDTO.id}`);
                        }}
                    >
                        {data.userDTO.fullname}
                    </Link>
                    <div className="overlay-icon" data-photoid={data.photoDTO.id}>
                        <ion-icon
                            name="download-outline"
                            onClick={(e) => {
                                e.stopPropagation();
                                PhotoService.download(data.photoDTO.path);
                            }}
                        ></ion-icon>
                        <ion-icon
                            name={data.photoDTO.likedByUser ? "heart" : "heart-outline"}
                            onClick={(e) => (e.target.name === "heart" ? sendLikeNotification(e, UserAction.UNLIKE_A_PHOTO) : sendLikeNotification(e, UserAction.LIKE_A_PHOTO))}
                        ></ion-icon>
                        {/* {data.photoDTO.likedByUser ? (
                            <ion-icon name="heart" onClick={(e) => sendLikeNotification(e, UserAction.UNLIKE_A_PHOTO)}></ion-icon>
                        ) : (
                            <ion-icon name="heart-outline" onClick={(e) => sendLikeNotification(e, UserAction.LIKE_A_PHOTO)}></ion-icon>
                        )} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoGridSingle;

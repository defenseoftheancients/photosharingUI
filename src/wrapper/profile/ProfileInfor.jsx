import React, { Fragment, useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NotificationService from "../../service/NotificationService";
import UserService from "../../service/UserService";
import SYSTEM_URL from "../../util/urls";
import { UserAction } from "../../util/UserAction";

const ProfileInfor = ({ profile, isOwner }) => {
    const currentUser = useSelector((state) => state.User);
    const [data, setData] = useState({ heading: "", list: [] });
    const socket = useSelector((state) => state.Socket);
    const navigate = useNavigate();
  
    const changeAvatar = async (file) => {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            const response = await UserService.changeAvtar(currentUser.user, SYSTEM_URL.USER_API_URL + `${currentUser.user.userDTO.id}/avatar`, file);
            if (response.status === 200) window.location.href = `/profile/${profile.id}`;
        } else {
            alert("Đây không phải là định dạng Ảnh!");
        }
    };
    
    const sendFollowNotification = (action) => {
        if (currentUser.isAuthUser) {
           
            const commentNotification = NotificationService.followNotification(
                currentUser.user,
                profile,
                action,
                "http://localhost:3000/profile/" + currentUser.user.userDTO.id
            );
            socket.socketServer.send("/app/private-follow", {}, JSON.stringify(commentNotification));
        } else navigate("/login");
    };
    const showModal = (e, data) => {
        e.stopPropagation();
        setData(data);
        const modal = document.getElementById("myModal");
        modal.style.display = "block";
    };
    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    };
    const handleClickAvatar = () => {
        document.querySelector("#default-btn").click();
    };
    const handleAvatarChange = (e) => {
        changeAvatar(e.currentTarget.files[0]);
    };
    const handleRouter = (e, id) => {
        window.location.href = "http://localhost:3000/profile/" + id;
    };
    useEffect(() => {
        window.addEventListener("click", closeModal);
        return () => {
            window.removeEventListener("click", closeModal);
        };
    }, [profile]);
    return (
        <Fragment>
            <div className="profile-header">
                <div className="profile-avatar">
                    <span>
                        {profile.avatar === `${SYSTEM_URL.PHOTO_API_URL()}/null` ? (
                            <img src={require("../../assets/image/default-user.jpg")} alt="avatar" />
                        ) : (
                            <img src={profile.avatar} alt="avatar" />
                        )}

                        {isOwner ? (
                            <span className="profile-editavatar" onClick={handleClickAvatar}>
                                <ion-icon name="add-circle"></ion-icon>
                            </span>
                        ) : null}
                        <input id="default-btn" type="file" hidden onChange={(e) => handleAvatarChange(e)} />
                    </span>
                </div>
                <div className="profile-infor">
                    <p className="profile-name">{profile.fullname}</p>
                    <div className="profile-interact">
                        <p style={{ cursor: "pointer" }} onClick={(e) => showModal(e, { heading: "follower", list: profile.follower })}>
                            Người theo dõi: {profile.follower.length}
                        </p>
                        <p style={{ cursor: "pointer" }} onClick={(e) => showModal(e, { heading: "followedUser", list: profile.followedUser })}>
                            Người đã theo dõi: {profile.followedUser.length}
                        </p>
                    </div>

                    <div className="profile-boxbutton">
                        {isOwner ? (
                            <div className="profile-upload">
                                <Link to="/upload">Tải ảnh lên</Link>
                            </div>
                        ) : (
                            <div className="profile-buttonfollow">
                                {!profile.isFollowing ? 
                                <span onClick={() => sendFollowNotification(UserAction.FOLLOW_A_USER)}>Theo dõi</span> : 
                                <span onClick={() => sendFollowNotification(UserAction.UNFOLLOW_A_USER)}>Hủy theo dõi</span>}
                            </div>
                        )}
                    </div>
                   
                </div>
            </div>
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={() => closeModal()}>
                        &times;
                    </span>
                    <h1>{data.heading === "follower" ? "Người theo dõi:" : "Người đã theo dõi:"}</h1>
                    <div className="modal-list">
                        {data.list.length > 0
                            ? data.list.map((item, index) => {
                                  return (
                                      // onClick={(e) => handleRouter(e, item.id)}
                                      <Link to={`/profile/${item.id}`} className="modal-listitem" key={index} onClick={(e) => handleRouter(e, item.id)}>
                                          {item.avatar === `${SYSTEM_URL.PHOTO_API_URL()}/null` ? (
                                              <img src={require("../../assets/image/default-user.jpg")} alt="avatar" />
                                          ) : (
                                              <img src={item.avatar} alt="avatar" />
                                          )}
                                          <span>{item.username}</span>
                                      </Link>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ProfileInfor;

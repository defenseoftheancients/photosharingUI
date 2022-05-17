import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { pushComment, SwitchReactionSelectedPhoto } from "../../redux/action/PhotoActions";
import NotificationService from "../../service/NotificationService";
import PhotoService from "../../service/PhotoService";
import SYSTEM_URL from "../../util/urls";
import { UserAction } from "../../util/UserAction";

const PhotoInfor = ({ photoDetail }) => {
    const currentUser = useSelector((state) => state.User);
    const [comment, setComment] = useState("");
    const [likedUsers, setLikedUsers] = useState([]);
    const { photoid } = useParams();
    const photoDispatch = useDispatch();
    const socket = useSelector((state) => state.Socket);
    const navigate = useNavigate();
    const sendLikeNotification = (action) => {
        if (currentUser.isAuthUser) {
            const likeNotification = NotificationService.likeNotification(currentUser.user, photoDetail, action, window.location.href);
            socket.socketServer.send("/app/private-like", {}, JSON.stringify(likeNotification));
        } else navigate("/login");
    };
    const sendCommentNotification = (action) => {
        if (currentUser.isAuthUser) {
            const commentNotification = NotificationService.commentNotification(currentUser.user, photoDetail, comment, action, window.location.href);
            socket.socketServer.send("/app/private-comment", {}, JSON.stringify(commentNotification));
            setComment("");
        } else navigate("/login");
    };
    const sendFollowNotification = (action) => {
        if (currentUser.isAuthUser) {
            const commentNotification = NotificationService.followNotification(
                currentUser.user,
                photoDetail,
                action,
                "http://localhost:3000/profile/" + currentUser.user.userDTO.id
            );
            socket.socketServer.send("/app/private-follow", {}, JSON.stringify(commentNotification));
        } else navigate("/login");
    };

    const showModal = async (e) => {
        e.stopPropagation();
        const modal = document.getElementById("myModal");
        const data = await PhotoService.getLikedUsesrOfPhoto(SYSTEM_URL.PHOTO_API_URL()+`/${photoid}/like`)
        modal.style.display = "block";
        setLikedUsers(data);

    };
    const closeModal = () => {
        const modal = document.getElementById("myModal");
        modal.style.display = "none";
    };
    useEffect(() => {
        window.addEventListener("click", closeModal);
        return () => {
            window.removeEventListener("click", closeModal);
        };
    }, []);
    const onMessageReceived = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.activitytype) {
            case UserAction.LIKE_A_PHOTO:
                photoDispatch(SwitchReactionSelectedPhoto(payloadData.photoDTO, payloadData.userDTO, payloadData.sender === currentUser.user.userDTO.username));
                break;
            case UserAction.COMMENT_A_PHOTO:
                photoDispatch(pushComment(payloadData.commentDTO));
                break;
            case UserAction.FOLLOW_A_USER:
                window.location.reload();
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        if (socket.connected) {
            socket.socketServer.subscribe(`/photo/${photoid}`, onMessageReceived);
        }
    }, [socket]);

 
    return (
        <div className="photo-infor">
            <div className="container-xxl">
                <Row className="justify-content-between justify-content-sm-center justify-content-xs-center">
                    <Col xs={12} sm={12} md={6} lg={7} xl={7} xxl={8}>
                        <div className="photo-infor-left">
                            <div className="photo-reaction">
                                <div className="photo-totallike">
                                    <ion-icon name={photoDetail.photo.likedByUser ? "heart" : "heart-outline"} 
                                    onClick={(e) => (e.target.name === "heart" ? 
                                        sendLikeNotification(UserAction.UNLIKE_A_PHOTO) :
                                        sendLikeNotification(UserAction.LIKE_A_PHOTO))}></ion-icon>
                                    {/* {photoDetail.photo.likedByUser ? (
                                        <ion-icon name="heart" onClick={() => sendLikeNotification(UserAction.UNLIKE_A_PHOTO)}></ion-icon>
                                    ) : (
                                        <ion-icon name="heart-outline" onClick={() => sendLikeNotification(UserAction.LIKE_A_PHOTO)}></ion-icon>
                                    )} */}

                                    <span style={{cursor:'pointer'}} onClick={(e)=>showModal(e)}>{photoDetail.photo.totalLike} lượt thích</span>
                                    <div id="myModal" className="modal">
                                        <div className="modal-content">
                                            <span className="close" onClick={() => closeModal()}>
                                                &times;
                                            </span>
                                            <h1>Người thích:</h1>
                                            <div className="modal-list">
                                                {likedUsers.length > 0
                                                    ? likedUsers.map((item, index) => {
                                                          return (
                                                              // onClick={(e) => handleRouter(e, item.id)}
                                                              <Link to={`/profile/${item.id}`} className="modal-listitem" key={index}>
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
                                </div>

                                <ion-icon name="download-outline" onClick={() =>  PhotoService.download(photoDetail.photo.path)}></ion-icon>
                            </div>

                            <div className="photo-shortdescription">
                                <div className="photo-avatar">
                                    {photoDetail.owner.avatar === SYSTEM_URL.PHOTO_API_URL() + "/null" ? (
                                        <img src={require("../../assets/image/default-user.jpg")} alt="avatar" />
                                    ) : (
                                        <img src={photoDetail.owner.avatar} alt="avatar" />
                                    )}
                                </div>
                                <div className="photo-titleandusername">
                                    <h2>{photoDetail.photo.title !== "" ? photoDetail.photo.title : "Unknown"}</h2>
                                    <br />
                                    <div>
                                        <p>
                                            bởi <Link to={`/profile/${photoDetail.owner.id}`}>{photoDetail.owner.username}</Link>
                                        </p>
                                        {currentUser.user.userDTO.id !== photoDetail.owner.id ? (
                                            <>
                                                {photoDetail.owner.isFollowing ? (
                                                    <button onClick={() => sendFollowNotification(UserAction.UNFOLLOW_A_USER)}>Bỏ theo dõi</button>
                                                ) : (
                                                    <button onClick={() => sendFollowNotification(UserAction.FOLLOW_A_USER)}>Theo dõi</button>
                                                )}
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="photo-uploadtime">
                                <span>Tải lên:</span> {new Date(photoDetail.photo.timepost).toLocaleString()}
                            </div>

                            <div className="photo-description">
                                <span>Mô tả:</span> {photoDetail.photo.description !== "" ? photoDetail.photo.description : " Unknown"}
                            </div>
                            <div className="photo-tagbox">
                                <div className="photo-taghead">Từ khóa: </div>
                                <div className="photo-tags">
                                    {photoDetail.photo.tags.map((tag) => (
                                        <span key={tag.id}>{tag.tagname}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="photo-device">
                                <span>Thiết bị:</span> Iphone XS
                            </div>
                            <div className="photo-device">
                                <span>Độ phân giải:</span> {photoDetail.photo.resolution}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={5} xl={5} xxl={4}>
                        {" "}
                        <div className="photo-infor-right">
                            <Form>
                                <FormGroup>
                                    <Label for="comment">Bình luận</Label>
                                    <Input
                                        value={comment}
                                        id="comment"
                                        name="email"
                                        placeholder="Nhập bình luận...."
                                        type="textarea"
                                        onChange={(e) => setComment(e.target.value)}
                                    />
                                    <Button onClick={() => sendCommentNotification(UserAction.COMMENT_A_PHOTO)}>Đăng</Button>
                                </FormGroup>
                            </Form>
                            <div className="photo-commentsbox">
                                <div className="photo-commenttotal">{photoDetail.comments.length} Bình luận</div>
                                <div className="photo-comments">
                                    {photoDetail.comments.map((comment) => {
                                        return (
                                            <div className="photo-comment" key={comment.id}>
                                                <div className="comment-top">
                                                    <div className="photo-commentleft">
                                                        <div className="photo-commmentavatar">
                                                            {comment.author.avatar === SYSTEM_URL.PHOTO_API_URL() + "/null" ? (
                                                                <img src={require("../../assets/image/default-user.jpg")} alt="avatar" />
                                                            ) : (
                                                                <img src={comment.author.avatar} alt="avatar" />
                                                            )}
                                                        </div>
                                                        <div className="photo-commmentusernameandcontent">
                                                            <Link to={`/profile/${comment.author.id}`}>{comment.author.fullname}</Link>
                                                            <p>{new Date(comment.timesent).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className="photo-commentright">
                                                        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                                    </div>
                                                </div>
                                                <div className="photo-commentbottom">
                                                    <p>{comment.content}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PhotoInfor;

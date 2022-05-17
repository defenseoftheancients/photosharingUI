import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SocketServer from "./service/SocketServer";
import SYSTEM_URL from "./util/urls";
import { setSocketServer } from "./redux/action/SocketActions";
import { UserAction } from "./util/UserAction";
import { pushNotifications } from "./redux/action/NotificationActions";
import { userLogout } from "./redux/action/UserActions";
import axiosIntercepter from "./util/axiosInterceptor";
import Loader from "./component/common/Loader";

const Home = lazy(() => import("./pages/home/Home"));
const Profile = lazy(() => import("./pages/profile/Profile"));
const Upload = lazy(() => import("./pages/upload/Upload"));
const Login = lazy(() => import("./pages/login/Login"));
const Registry = lazy(() => import("./pages/registry/Registry"));
const PhotoDetail = lazy(() => import("./pages/photodetail/PhotoDetail"));
const Search = lazy(() => import("./pages/search/Search"));



const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

function App() {
    const currentUser = useSelector((state) => state.User);
    const socket = useSelector((state) => state.Socket);
    const location = useLocation();
    const userDispatch = useDispatch();
    const socketDispatch = useDispatch();
    const navigate = useNavigate();

    const onPrivateMessage = (payload) => {
        const payloadData = JSON.parse(payload.body);
        switch (payloadData.activitytype) {
            case UserAction.LIKE_A_PHOTO:
                if (payloadData.sender.id !== currentUser.user.userDTO.id) socketDispatch(pushNotifications(payloadData));
                if (!window.location.href.includes("photo")) {
                    const els = document.querySelectorAll(`[data-photoid="${payloadData.likedPhoto.id}"] ion-icon[name="heart-outline"]`);
                    els.forEach((el) => {
                        el.setAttribute("name", "heart");
                    });
                }
               
                break;
            case UserAction.UNLIKE_A_PHOTO:
                if (!window.location.href.includes("photo")) {
                    const els = document.querySelectorAll(`[data-photoid="${payloadData.likedPhoto.id}"] ion-icon[name="heart"]`);
                    els.forEach((el) => {
                        el.setAttribute("name", "heart-outline");
                    });
                }
                break;
            case UserAction.COMMENT_A_PHOTO:
                socketDispatch(pushNotifications(payloadData));
                break;
            case UserAction.FOLLOW_A_USER:
                if (payloadData.sender.id === currentUser.user.userDTO.id) window.location.reload();
                else socketDispatch(pushNotifications(payloadData));
                break;
            case UserAction.UNFOLLOW_A_USER:
                window.location.reload();
                break;
            default:
                break;
        }
    };

    const onError = (err) => {
        console.log(err);
    };

    useEffect(() => {
        if (socket.socketServer === null) {
            const socketServerInit = new SocketServer(SYSTEM_URL.STOMP_END_POINT);
            const onConnected = () => {
                socketDispatch(setSocketServer(socketServerInit));
            };
            socketServerInit.connect(onConnected, onError);
        } else {
            if (currentUser.isAuthUser) {
                socket.socketServer.subscribe(`/user/${currentUser.user.userDTO.username}/private`, onPrivateMessage);
            }
        }
    }, [currentUser, socket]);

    useEffect(() => {
        if (currentUser.isAuthUser) {
            const decodedJwt = parseJwt(currentUser.user.accessToken);
            if (decodedJwt.exp * 1000 < Date.now()) {
                userDispatch(userLogout());
                navigate("/login");
            }
        }
    }, [location]);
    return (
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile/:userid" element={<Profile />} />
                <Route path="/photo/:photoid" element={<PhotoDetail />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registry" element={<Registry />} />
                <Route path="/search/:searchparam" element={<Search />} />
            </Routes>
        </Suspense>
    );
}

export default App;

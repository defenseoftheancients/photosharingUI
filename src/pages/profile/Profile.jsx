import React, { Fragment, useLayoutEffect, useState } from "react";
import Helmet from "react-helmet";
import LayoutOne from "../../layout/LayoutOne";
import ProfileInfor from "../../wrapper/profile/ProfileInfor";
import TabPhoto from "../../wrapper/photo/TabPhoto";
import SYSTEM_URL from "../../util/urls";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../../service/UserService";
const Profile = () => {
    const [profile, setProfile] = useState(null);
    const currentUser = useSelector((state) => state.User.user);
    const navigate = useNavigate();
    const { userid } = useParams();
    const fetchUser = async () => {
        const response = await UserService.getUser(currentUser, `${SYSTEM_URL.USER_API_URL}${userid}`);

        if (response.status === 200) {
            setProfile(response.data);
        } else if (response.status === 404) {
            navigate("/home");
        }
    };
    useLayoutEffect(() => {
        fetchUser();
        return () => {
            window.location.reload();
        }
    }, [userid]);

    return (
        <Fragment>
            {profile ? (
                <>
                    <Helmet>
                        <title>{profile.fullname}</title>
                    </Helmet>
                    <LayoutOne>
                        <ProfileInfor profile={profile} isOwner={currentUser.userDTO ? profile.id === currentUser.userDTO.id : false} />
                        <TabPhoto items={currentUser.userDTO ? 
                            (profile.id === currentUser.userDTO.id ?
                                [{
                                    display: "Ảnh cá nhân",
                                    url: SYSTEM_URL.PHOTO_API_URL(userid),
                                    sortParam: null,
                                    isAuth: false
                                },
                                {
                                    display: "Ảnh đã thích",
                                    url: SYSTEM_URL.PHOTO_API_URL(userid)+"/like",
                                    sortParam: null,
                                    isAuth: true
                                }] 
                                : 
                                [{
                                    display: "Ảnh cá nhân",
                                    url: SYSTEM_URL.PHOTO_API_URL(userid),
                                    sortParam: null,
                                    isAuth: false
                                },]) 
                                : 
                                [{
                                    display: "Ảnh cá nhân",
                                    url: SYSTEM_URL.PHOTO_API_URL(userid),
                                    sortParam: null,
                                    isAuth: false
                                },]}
                            // items={[
                            //     {
                            //         display: "Ảnh cá nhân",
                            //         url: SYSTEM_URL.PHOTO_API_URL(userid),
                            //         sortParam: null,
                            //     },
                               

                            // ]}
                            setHeading={false}
                        />
                    </LayoutOne>
                </>
            ) : null}
        </Fragment>
    );
};

export default Profile;

import React, { Fragment, useEffect } from "react";
import Helmet from "react-helmet";
import LayoutOne from "../../layout/LayoutOne";
import HeroSliderTwo from "../../wrapper/hero-slider/HeroSliderTwo";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeSelectedPhoto, selectedPhoto, stackComments } from "../../redux/action/PhotoActions";
import PhotoInfor from "../../wrapper/photo/PhotoInfor";
import PhotoService from "../../service/PhotoService";
const PhotoDetail = () => {
    const photoDetail = useSelector((state) => state.Photo);
    const currentUser = useSelector((state) => state.User.user);
    const { photoid } = useParams();
    const photoDispatch = useDispatch();
    const navigate = useNavigate();
    //   Nr88sR3i4Tg
    //   j65zhd0DKrk
    // const response = await axios
    //   .get(
    //     `https://api.unsplash.com/photos/${photoid}?client_id=GbLjF_DfkvLuHrnKWWoqYE4tVYCi3unkuON0Tc6slV0`
    //   ).then((response)=> {
    //      photoDispatch(selectedPhoto(response.data));
    //   })
    //   .catch((error) => {
    //     console.log("Error", error);
    //   });
    // console.log(response.data);

    const fetchPhoto = async () => {
        const response = await PhotoService.getPhoto(currentUser, photoid);

        if (response.status === 200) photoDispatch(selectedPhoto(response.data.photoDTO, response.data.userDTO));
        else if (response.status === 404) navigate("/home");
    };
    const fetchComment = async () => {
        const response = await PhotoService.getComment(photoid);
        if (response.status === 200) photoDispatch(stackComments(response.data));
    };
    useEffect(() => {
        if (photoid && photoid !== "") {
            fetchPhoto();
            fetchComment();
        }
        return () => {
            photoDispatch(removeSelectedPhoto());
        };
    }, [photoid]);
    return (
        <Fragment>
            <Helmet>
                <title>Photo Detail</title>
            </Helmet>
            <LayoutOne>
                {photoDetail.photo === null ? (
                    <div>Loading...</div>
                ) : (
                    <Fragment>
                        <HeroSliderTwo photoDetail={photoDetail} />
                        <PhotoInfor photoDetail={photoDetail} />
                    </Fragment>
                )}
            </LayoutOne>
        </Fragment>
    );
};

export default PhotoDetail;

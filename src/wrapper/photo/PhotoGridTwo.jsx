import axios from "axios";

import React, { Fragment, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import PhotoGridSingle from "../../component/photo/PhotoGridSingle";
import { removePhotos, setPhotos } from "../../redux/action/PhotoActions";
import PhotoService from "../../service/PhotoService";

const PhotoGridTwo = ({ url, sortParam, searchParam }) => {
    const currentUser = useSelector((state) => state.User.user);
    const photoDispatch = useDispatch();
    const photosData = useSelector((state) => state.Photos);
    const fetchPhotos = async () => {
        const data = await PhotoService.getPhotos(url, currentUser, photosData.page, sortParam, searchParam);
        photoDispatch(setPhotos(data));
    };
    useLayoutEffect(() => {
        fetchPhotos();
        return () => {
            photoDispatch(removePhotos())
        }
    }, [photosData.page, searchParam]);
  

    return (
        <Fragment>
            <Container className="flexbin flexbin-margin mx-auto">
                {photosData.photos.map((photo) => (
                    <PhotoGridSingle key={new Date() + Math.random()} data={photo} />
                ))}
            </Container>
        </Fragment>
    );
};

export default PhotoGridTwo;

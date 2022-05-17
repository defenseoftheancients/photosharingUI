
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "reactstrap";
import PhotoGridSingle from "../../component/photo/PhotoGridSingle";
import PhotoService from "../../service/PhotoService";

const PhotoGrid = ({ url, sortParam, isAuth }) => {
    const currentUser = useSelector((state) => state.User);
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const fetchPhotos = async () => {
        if (isAuth && currentUser.isAuthUser) {
            setLoading(true);
            let data = null;
            if(url.includes("like")) 
                data = await PhotoService.getlikedPhotosOfUser(url, currentUser.user, page);
            
            else if(url.includes("follow")) 
                data = await PhotoService.getPhotosOfFollowedUser(url, currentUser.user, page);
            let newPhotos = [...photos];
            if (data.length > 0) {
                data.forEach((photo) => {
                    newPhotos.push(photo);
                });
                setPhotos(newPhotos);
                setLoading(false);
            }
        } else if (!isAuth) {
            setLoading(true);
            const data = await PhotoService.getPhotos(url, currentUser.user, page, sortParam);
            let newPhotos = [...photos];
            if (data.length > 0) {
                data.forEach((photo) => {
                    newPhotos.push(photo);
                });
                setPhotos(newPhotos);
                setLoading(false);
            }
        }
    };
    useLayoutEffect(() => {
        fetchPhotos();
    }, [page]);
    const trackScrolling = () => {
        const wrappedElement = document.querySelector(".flexbin");
        if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
            // console.log("header bottom reached");
            if(!isLoading) {
                setPage((state) => state + 1);
            }
                
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", trackScrolling);
        return () => {
            window.removeEventListener("scroll", trackScrolling);
        };
    }, []);

    return (
        <Fragment>
            <Container className="flexbin flexbin-margin mx-auto">
                {photos.map((photo) => (
                    <PhotoGridSingle key={new Date() + Math.random()} data={photo} />
                ))}
            </Container>
        </Fragment>
    );
};

export default PhotoGrid;

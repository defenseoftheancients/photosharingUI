import React, { Fragment, useEffect } from "react";
import Lightense from "lightense-images";

const HeroSliderTwoSingle = ({ photoDetail }) => {

   

    useEffect(() => {
      var el = document.querySelectorAll('img.lightense');
      Lightense(el);
    
    }, [photoDetail]);
    return (
        <Fragment>
            <div className="photo-detail">
                <img src={photoDetail.photo.path} alt={photoDetail.photo.id} className="lightense"  />
            </div>
        </Fragment>
    );
};

export default HeroSliderTwoSingle;

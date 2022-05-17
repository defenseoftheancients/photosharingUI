import React from "react";
import { Link } from "react-router-dom";

const HeroSliderOneSingle = ({ author, title, srcImage }) => {
  return (
    <div className="slider" style={{backgroundImage: `url(${require(`../../assets/image/${srcImage}`)})`}}>
      <div className="container-md d-flex justify-content-center">
        <div className="slider-left d-flex flex-column justify-content-center">
          <p className="slider-author">{author}</p>
          <p className="slider-title">{title}</p>
          <div className="slider-btn btn-hover"><Link className="" to={"/home"}>Giới thiệu</Link></div>
        </div>
        {/* <div className="slide-right">
          <img
            src={require(`../../assets/image/${srcImage}`)}
            alt="slider-preview"
          />
        </div> */}
      </div>
    </div>
  );
};

export default HeroSliderOneSingle;

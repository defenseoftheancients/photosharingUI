import React, { Fragment } from "react";
import Helmet from "react-helmet";
import LayoutOne from "../../layout/LayoutOne";
import HeroSliderOne from "../../wrapper/hero-slider/HeroSliderOne";
import TabPhoto from "../../wrapper/photo/TabPhoto";
import SYSTEM_URL from "../../util/urls";
const Home = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <LayoutOne>
        <HeroSliderOne />

        <TabPhoto
          items={[
            {
              display: "Trang chủ",
              url: SYSTEM_URL.PHOTO_API_URL(),
              sortParam: null,
              isAuth: false
            },
            {
              display :"Ảnh xu huớng",
              url: SYSTEM_URL.PHOTO_API_URL(),
              sortParam: "DESC",
              isAuth: false
            },
            {
              display :"Ảnh theo dõi",
              url: SYSTEM_URL.PHOTO_API_URL()+"/follow",
              sortParam: "DESC",
              isAuth: true
            }
          ]}
          setHeading={true}
          headingValue="Sharing your photos"
        />
      </LayoutOne>
    </Fragment>
  );
};

export default Home;

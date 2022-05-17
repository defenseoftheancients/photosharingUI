import React, { Fragment } from "react";

import HeaderOne from "../wrapper/header/HeaderOne";

const LayoutOne = ({ children }) => {
    return (
        <Fragment>
            <HeaderOne />
            {children}
            {/* <FooterOne/> */}
        </Fragment>
    );
};

LayoutOne.propTypes = {};

export default LayoutOne;

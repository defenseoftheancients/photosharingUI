import React, { Fragment} from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import LayoutOne from "../../layout/LayoutOne";

import SYSTEM_URL from "../../util/urls";

import PhotoGridTwo from "../../wrapper/photo/PhotoGridTwo";
const Search = () => {
    const {searchparam} = useParams();
   
    return (
        <Fragment>
            <Helmet>
                <title>Search</title>
            </Helmet>
            <LayoutOne>
                <PhotoGridTwo url={SYSTEM_URL.PHOTO_API_URL()} searchParam={searchparam}/>
            </LayoutOne>
        </Fragment>
    );
};

export default Search;

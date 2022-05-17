import React, { Fragment } from "react";
import Helmet from "react-helmet";
import LayoutOne from "../../layout/LayoutOne";

import { useSelector } from "react-redux";
import UploadForm from "../../wrapper/upload/UploadForm";
import UploadFrame from "../../wrapper/upload/UploadFrame";
const Upload = () => {
  const files = useSelector((state=>state.File.files));
  

  return (
    <Fragment>
      <Helmet>
        <title>Tải ảnh lên</title>
      </Helmet>
      <LayoutOne>
      
        {files.length === 0 ? <UploadFrame/> :
        <UploadForm/>}

      </LayoutOne>
    </Fragment>
  );
};

export default Upload;
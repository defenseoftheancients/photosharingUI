import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setFile } from "../../redux/action/FileActions";
import PhotoService from "../../service/PhotoService";
import SYSTEM_URL from "../../util/urls";

const UploadFrame = () => {
 
    const fileDisptach = useDispatch();
    const showFile = async (file) => {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            const data = await PhotoService.getTags(SYSTEM_URL.OBJECT_DETECTION_URL, file);
            if(data.length > 0) 
               fileDisptach(setFile(file, data.map(tag=> tag.class)));
            else
                fileDisptach(setFile(file, []));
        } else {
            alert("Đây không phải là định dạng Ảnh!");
            document.querySelector(".text").textContent = "Kéo & Thả để đăng ảnh lên";
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("active");
        document.querySelector(".text").textContent = "Thả để đăng ảnh lên";
    };
    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("active");
        document.querySelector(".text").textContent = "Chưa file nào đc chọn!";
    };
    const handleDrop = (e) => {
        e.preventDefault();
        showFile(e.dataTransfer.files[0]);
    };
    const handleClickFile = () => { document.querySelector("#default-btn").click();};
    const handleFileChange = (e) => {showFile(e.currentTarget.files[0]);};

    return (
        <Fragment>
            <div className="upload-file">
                <div className="wrapper" onDragOver={(e) => handleDragOver(e)} onDragLeave={(e) => handleDragLeave(e)} onDrop={(e) => handleDrop(e)}>
                    <div className="content">
                        <div className="icon">
                            <ion-icon name="cloud-upload-outline"></ion-icon>
                        </div>
                        <div className="text">Chưa file nào đc chọn!</div>
                    </div>
     
                </div>
                <button id="custom-btn" onClick={handleClickFile}>
                    Chọn ảnh
                </button>
            </div>
            <input id="default-btn" type="file" hidden onChange={(e) => handleFileChange(e)} />
        </Fragment>
    );
};

export default UploadFrame;

import React  from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedFile, setFile } from "../../redux/action/FileActions";
import PhotoService from "../../service/PhotoService";
import SYSTEM_URL from "../../util/urls";

const FileDisplay = ({ setActive }) => {
    const files = useSelector((state) => state.File.files);
    const fileDisptach = useDispatch();

    const showFile = async (file) => {
        let fileType = file.type;
        let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
        if (validExtensions.includes(fileType)) {
            const data = await PhotoService.getTags(SYSTEM_URL.OBJECT_DETECTION_URL, file);
            if (data.length > 0)
                fileDisptach(
                    setFile(
                        file,
                        data.map((tag) => tag.class)
                    )
                );
            else fileDisptach(setFile(file, []));
        } else {
            alert("Đây không phải là định dạng Ảnh!");
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add("active");
    };
    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove("active");
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("active");
        showFile(e.dataTransfer.files[0]);
    };
    const removeFile = (index, src) => {
        fileDisptach(removeSelectedFile(index));
        URL.revokeObjectURL(src);
    };
   
    return (
        <div className="file-display" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e)}>
            <div className="file-box">
                {files.map((file, index) => {
                    const src = URL.createObjectURL(file.src);
                    return (
                        <div key={index} className="file-frame" onClick={() => setActive(index)}>
                            <img key={index} src={src} alt="preview" />
                            <div className="cancel-btn">
                                <ion-icon
                                    name="close-outline"
                                    onClick={() => {
                                        removeFile(index, src)
                                    }}
                                ></ion-icon>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FileDisplay;

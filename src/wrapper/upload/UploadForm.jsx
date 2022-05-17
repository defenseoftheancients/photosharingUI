import React, { useState } from "react";
import { useSelector } from "react-redux";
import FileDisplay from "../../component/upload/FileDisplay";
import FileInfor from "../../component/upload/FileInfor";
const UploadForm = () => {
    const files = useSelector((state) => state.File.files);
    const [activeFile, setActiveFile] = useState(0);
    const handleActiveFile = (index) => {
        setActiveFile(index);
    };
    return (
        <div className="upload-form">
            <FileDisplay setActive={handleActiveFile} />

            {files.map((file, index) => {
                return index === activeFile ? (
                    <FileInfor key={index} display="block" activeFile={activeFile} file={file} index={index} />
                ) : (
                    <FileInfor key={index} display="none" activeFile={activeFile} file={file} index={index} />
                );
            })}
        </div>
    );
};

export default UploadForm;

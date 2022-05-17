import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { removeAllFiles } from "../../redux/action/FileActions";
import Tagin from "tagin";
import PhotoService from "../../service/PhotoService";
const FileInfor = ({ display, index, file}) => {
    const files = useSelector((state) => state.File.files);
    const currentUser = useSelector((state) => state.User.user);
    const navigate = useNavigate();
    const tagin = useRef(null);
    const fileDispatch = useDispatch();
    useEffect(()=> {
        tagin.current = new Tagin(document.querySelectorAll(`.tagin`)[index], {
            separator: " ",
            enter: true,
        });
    }, [])
    useEffect(() => {
        tagin.current.addTag(file.tags);
    }, [file]);
    const handleSubmit = () => {
        PhotoService.uploadPhoto(currentUser, files).then(() => {
            fileDispatch(removeAllFiles())
          navigate(`/profile/${currentUser.userDTO.id}`)
        });
    };

    useEffect(()=> {
        return () => {
            fileDispatch(removeAllFiles())
        }
    }, [])
    return (
        <div className="file-infor" style={{ display: display }}>
            <div className="file-count">Số ảnh đã chọn: {files.length}</div>
            <Form>
                <FormGroup>
                    <Label for="title">Tiêu đề</Label>
                    <Input id="title" name="title" placeholder="Nhập tiêu đề" type="text" />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Mô tả</Label>
                    <Input id="description" name="description" placeholder="Nhập mô tả" type="textarea" />
                </FormGroup>

                <FormGroup>
                    <Label for="keyword">Từ khóa</Label>
                    <input type="text" name="tag" className={`form-control tagin`} data-tagin-placeholder="Thêm từ khóa..." onChange={null} style={{ width: "100% !important" }} />
                </FormGroup>
            </Form>

            <div className="file-submit">
                <Button onClick={handleSubmit}>Đăng ảnh</Button>
            </div>
        </div>
    );
};

export default FileInfor;

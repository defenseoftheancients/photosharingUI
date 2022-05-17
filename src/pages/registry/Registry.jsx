import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import FormGroup from "../../component/input/FormGroup";
import InputPassword from "../../component/input/InputPassword";
import InputNormal from "../../component/input/InputNormal";
import ButtonSubmit from "../../component/input/ButtonSubmit";

import * as regexs from "../../util/regex.js";
import AuthenticationService from "../../service/AuthenticationService";
const Registry = () => {
    const navigate = useNavigate();
    const root = "registry";
    const [feedBack, setFeedBack] = useState({
        successful: false,
        message: "",
    });
    const handleRegistry = (e) => {
        e.preventDefault();
        const registryForm = document.querySelector("#registry-form");
        const fieldError = registryForm.getElementsByClassName("input-error");
        const inputs = registryForm.querySelectorAll("input");
       
        if (fieldError.length === 0 && inputs[0].value !== "" && inputs[1].value !== "" && inputs[2].value !== "" && inputs[3].value !== "") {
            AuthenticationService.register(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value).then(
                (response) => {
                    setFeedBack({
                        message: response.data.message,
                        successful: true,
                    });
                    navigate("/login");
                },
                (error) => {
                    const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    setFeedBack({
                        successful: false,
                        message: resMessage,
                    });
                }
            );
        }
    };
    return (
        <div className="log">
            <div className="form-box">
                <h2>Đăng ký</h2>
                <p>
                    {" "}
                    <Link to={"/login"} style={{ color: "#fff" }}>
                        Đã có tài khoản?
                    </Link>
                </p>
                <div className="row justify-content-center px-2 m-0">
                    <form action="" className="col-11 col-sm-8 col-md-6 col-lg-4" id="registry-form">
                        <FormGroup>
                            <InputNormal
                                type="text"
                                name="username"
                                placeholder="Tên đăng nhập"
                                root={root}
                                regexs={[
                                    {
                                        regex: regexs.emptyRegex,
                                        display: "Vui lòng điền vào ô trống",
                                    },
                                    {
                                        regex: regexs.usernameRegex,
                                        display: "Tên đăng nhập từ 8 đến 20 kí tự, bao gồm chữ cái và số",
                                    },
                                ]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputNormal
                                type="text"
                                name="fullname"
                                placeholder="Họ và tên"
                                root={root}
                                regexs={[
                                    {
                                        regex: regexs.emptyRegex,
                                        display: "Vui lòng điền vào ô trống",
                                    },
                                ]}
                            />
                        </FormGroup>
                        <FormGroup>
                            <InputPassword
                                type="password"
                                name="password"
                                placeholder="Mật khẩu"
                                root={root}
                                regexs={[
                                    {
                                        regex: regexs.emptyRegex,
                                        display: "Vui lòng điền vào ô trống",
                                    },
                                    {
                                        regex: regexs.passwordRegex,
                                        display: "Tối thiệu 8 kí tự bao gồm ít nhất 1 chữ cái in hoa, 1 chữ cái in thường, 1 số và 1 kí tự đặc biệt",
                                    },
                                ]}
                            />
                        </FormGroup>

                        {root === "registry" && (
                            <FormGroup>
                                <InputNormal
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    root={root}
                                    regexs={[
                                        {
                                            regex: regexs.emptyRegex,
                                            display: "Vui lòng điền vào ô trống",
                                        },
                                        {
                                            regex: regexs.emailRegex,
                                            display: "Vui lòng điền đúng định dạng email",
                                        },
                                    ]}
                                />
                            </FormGroup>
                        )}

                        <FormGroup>
                            <ButtonSubmit display="Đăng ký" root={root} handleSubmit={handleRegistry} />
                        </FormGroup>

                        <div className={feedBack.successful ? "feedback success mt-4 text-center" : "feedback mt-4 text-center"}>{feedBack.message}</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registry;

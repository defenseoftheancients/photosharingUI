import React from "react";
import { Link } from "react-router-dom";
import FormGroup from "./FormGroup";
import InputPassword from "./InputPassword";
import InputNormal from "./InputNormal";
import ButtonSubmit from "./ButtonSubmit";
import RememberCheckbox from "./RememberCheckbox";
import * as regexs from "../../util/regex.js"

const FormLog = ({ headingValue, redirectPath, displayPath, root }) => {
  return (
    <div className="log">
      <div className="form-box">
        <h2>{headingValue}</h2>
        <p>
          {" "}
          <Link to={redirectPath} style={{ color: "#fff" }}>
            {displayPath}
          </Link>
        </p>
        <div className="row justify-content-center px-2 m-0">
          <form action="" className="col-11 col-sm-8 col-md-6 col-lg-4">
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
                    display:
                      "Tên đăng nhập từ 8 đến 20 kí tự, bao gồm chữ cái và số",
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
                    display:
                      "Tối thiệu 8 kí tự bao gồm ít nhất 1 chữ cái in hoa, 1 chữ cái in thường, 1 số và 1 kí tự đặc biệt",
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
              <ButtonSubmit display={headingValue} root={root} />
            </FormGroup>
            {root === "signup" && (
              <FormGroup
                classname={
                  "d-flex flex-row justify-content-between align-items-center"
                }
              >
                <RememberCheckbox />
                <div className="log__forgot">
                  <Link to="/login" style={{ color: "#fff" }}>
                    Quên mật khẩu
                  </Link>
                </div>
              </FormGroup>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormLog;

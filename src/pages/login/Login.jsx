import React, { useEffect, useState } from 'react'
import { useNavigate  } from "react-router-dom";
import { Link} from "react-router-dom";
import FormGroup from "../../component/input/FormGroup";
import InputPassword from "../../component/input/InputPassword";
import InputNormal from "../../component/input/InputNormal";
import ButtonSubmit from "../../component/input/ButtonSubmit";
import RememberCheckbox from "../../component/input/RememberCheckbox";
import * as regexs from "../../util/regex.js"
import AuthenticationService from '../../service/AuthenticationService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserError, setUserSuccess } from '../../redux/action/UserActions';



const Login = () => {
  const root = "login";
  const currentUser = useSelector((state)=>state.User);
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const [feedBack, setFeedBack] = useState({
    successful: false,
    message: ""
  })
  const handleRegistry = (e) => {
   
    e.preventDefault();
    const registryForm = document.querySelector('#registry-form');
    const fieldError = registryForm.getElementsByClassName('input-error');
    const inputs = registryForm.querySelectorAll('input');
    if(fieldError.length === 0 
      && inputs[0].value !== ""
      && inputs[1].value !== ""
      ) {
     
      AuthenticationService.login(
        inputs[0].value,
        inputs[1].value)
        .then(
          response => {
            userDispatch(setUserSuccess(response));
            navigate("/home");
          },
          error => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setFeedBack({
              successful: false,
              message: resMessage
            });
            userDispatch(setUserError(true));
          }
        );
    }
  }
  useEffect(()=> {
    if(currentUser.isAuthUser) {
      navigate("/home");
    }
  }, []);

  return (
  
    <div className="log">
      <div className="form-box">
        <h2>????ng nh???p</h2>
        <p>
          {" "}
          <Link to={"/registry"} style={{ color: "#fff" }}>
            Ch??a c?? t??i kho???n?
          </Link>
        </p>
        <div className="row justify-content-center px-2 m-0">
          <form action="" className="col-11 col-sm-8 col-md-6 col-lg-4" id='registry-form'>
            <FormGroup>
              <InputNormal
                type="text"
                name="username"
                placeholder="T??n ????ng nh???p"
                root={root}
                regexs={[
                  {
                    regex: regexs.emptyRegex,
                    display: "Vui l??ng ??i???n v??o ?? tr???ng",
                  },
                  {
                    regex: regexs.usernameRegex,
                    display:
                      "T??n ????ng nh???p t??? 8 ?????n 20 k?? t???, bao g???m ch??? c??i v?? s???",
                  },
                ]}
              />
            </FormGroup>
            <FormGroup>
              <InputPassword
                type="password"
                name="password"
                placeholder="M???t kh???u"
                root={root}
                regexs={[
                  {
                    regex: regexs.emptyRegex,
                    display: "Vui l??ng ??i???n v??o ?? tr???ng",
                  },
                  {
                    regex: regexs.passwordRegex,
                    display:
                      "T???i thi???u 8 k?? t??? bao g???m ??t nh???t 1 ch??? c??i in hoa, 1 ch??? c??i in th?????ng, 1 s??? v?? 1 k?? t??? ?????c bi???t",
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
                      display: "Vui l??ng ??i???n v??o ?? tr???ng",
                    },
                    {
                      regex: regexs.emailRegex,
                      display: "Vui l??ng ??i???n ????ng ?????nh d???ng email",
                    },
                  ]}
                />
              </FormGroup>
            )}

            <FormGroup>
              <ButtonSubmit display="????ng nh???p" root={root} handleSubmit={handleRegistry}/>
            </FormGroup>
            {root === "login" && (
              <FormGroup
                classname={
                  "d-flex flex-row justify-content-between align-items-center"
                }
              >
                <RememberCheckbox />
                <div className="log__forgot">
                  <Link to="/login" style={{ color: "#fff" }}>
                    Qu??n m???t kh???u
                  </Link>
                </div>
              </FormGroup>
            )}
             <div className={feedBack.successful ? 
              "feedback success mt-4 text-center" : "feedback mt-4 text-center"}>{feedBack.message}</div>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
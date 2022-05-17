import React from "react";
import Form from "../../components/input/Form";

const root = "login";
const Login = () => {
  return (
    <Form headingValue="Đăng nhập" redirectPath="/signup" displayPath="Chưa có tài khoản?" root={root}/>
  );
};

export default Login;

import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { userLogout } from "../../redux/action/UserActions";
const AccountIcon = () => {
  const currentUser = useSelector(state=>state.User.user);
  
  const userDispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!isOpen);
  };
  const handleLogout = () => {
    userDispatch(userLogout())
  };
  return (
    <div className="header-account">
      <Dropdown isOpen={isOpen} toggle={toggle} className="">
        <DropdownToggle className=" account-active bg-transparent border-0 shadow-none">
          <ion-icon name="person-circle-outline"></ion-icon>
        </DropdownToggle>

        <DropdownMenu className="account-dropdown border-0 p-0">
          <div className="account-dropdowncontent">
            <ul>
              {!currentUser.userDTO ? (
                <Fragment>
                  <li>
                    <Link to={"/login"}>Đăng nhập</Link>
                  </li>
                  <li>
                    <Link to={"/registry"}>Đăng ký</Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li>
                    <Link to={"/login"} onClick={handleLogout}>Đăng xuất</Link>
                  </li>
                  <li>
                    <Link to={`/profile/${currentUser.userDTO.id}`}>Tài khoản</Link>
                  </li>
                </Fragment>
              )}
            </ul>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default AccountIcon;

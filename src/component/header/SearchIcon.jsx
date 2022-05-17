import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
const SearchIcon = (props) => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
 
  const toggle = () => {
    setOpen(!isOpen);
  };
  const handleSearch = () => {
    const inputSearch = document.querySelector('.input-search');
    navigate(`/search/${inputSearch.value.split(/(\s+)/).filter( function(e) { return e.trim().length > 0;}).join("-")}`)
  }
  return (
    <div className="header-search">
      <Dropdown isOpen={isOpen} toggle={toggle} className="position-static">
        <DropdownToggle className="search-active bg-transparent border-0 shadow-none">
        <ion-icon className="" name="search-outline"></ion-icon>
        </DropdownToggle>

        <DropdownMenu className="search-content border-0">
          <div className="">
            <form action="#">
              <InputGroup>
                <Input className="input-search shadow-none" placeholder="Tìm kiếm..." />
                <Button className="button-search d-flex" onClick={()=>handleSearch()}><ion-icon className="" name="search-outline"></ion-icon></Button>
              </InputGroup>
              {/* <input type="text" placeholder="Search" /> */}
            </form>
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};


export default SearchIcon;

import React from "react";

import SearchIcon from "./SearchIcon";
import AccountIcon from "./AccountIcon";
import NotificationIcon from "./NotificationIcon";

const IconGroup = (props) => {
  return (
    <div className="icon-group d-flex align-items-center">
      <NotificationIcon/>
      <SearchIcon />
      <AccountIcon />
    </div>
  );
};



export default IconGroup;

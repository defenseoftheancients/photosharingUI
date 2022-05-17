import React, { memo } from "react";

const RememberCheckbox = () => {
  
  return (
    <div className="checkbox-remmember">
      <label className="checkbox-wrap checkbox-primary d-flex align-items-center">
        <span className="checkbox-remmembertxt">Ghi nhớ</span>
        <input
          type="checkbox"
          className="input-checkbox"
          onClick={(e) => {
          }}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default memo(RememberCheckbox);

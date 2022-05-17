import React, { memo } from "react";

const ButtonSubmit = ({display, handleSubmit}) => {
  return (
    <button onClick={(e)=>handleSubmit(e)}
      id=""
      type="button"
      className={`form-control btn btn-primary submit px-3 input-submit`}
    >
      {display}
    </button>
  );
};

export default memo(ButtonSubmit);

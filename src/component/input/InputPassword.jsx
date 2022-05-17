import React, { memo, useState } from "react";

const InputPassword = (props) => {
  const [feedBack, setFeedBack] = useState("");
  const [toggleIcon, setToglgleIcon] = useState(true);
  const [valueInput, setValueInput] = useState(() => {
    const input = document.querySelector(`.${props.root}__${props.name}`);
    return input === null ? "" : input.value;
  });

  const handleChange = (e) => {
    setValueInput(e.target.value);
  };
  const handleBlur = (e) => {
    const element = e.target;
    for (let item of props.regexs) {
      if (item.regex.test(valueInput) === false) {
        element.classList.add(`input-error`);
        setFeedBack(item.display);
        return;
      }
    }
    element.classList.remove(`input-error`);
    element.nextSibling.innerHTML = "";
  };
  const handleFocus = (e) => {
    e.target.classList.remove(`input-error`);
    setFeedBack('');
  };
  return (
    <>
      <div className="position-relative">
        <input
          spellCheck="false"
          type={toggleIcon ? "password" : "text"}
          placeholder={props.placeholder}
          className={`form-control input-password ${props.root}__${props.name}`}
          required={true}
          value={valueInput}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {!toggleIcon ? (
          <ion-icon name="eye-outline"
          onClick={() => setToglgleIcon(!toggleIcon)}></ion-icon>
        ) : (
          <ion-icon name="eye-off-outline"
          onClick={() => setToglgleIcon(!toggleIcon)}></ion-icon>
        )}
      </div>
      <div className={`feedback my-2`}>
        {feedBack}
      </div>
    </>
  );
};

export default memo(InputPassword);

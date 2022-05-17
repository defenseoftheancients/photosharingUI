import React, { memo, useState } from "react";

const InputNormal = (props) => {
  const [feedBack, setFeedBack] = useState('');
  const [valueInput, setValueInput] = useState(() => {
    const input = document.querySelector(`.${props.root}__${props.name}`);
    return input === null ? "" : input.value;
  });

  const handleChange = (e) => {
    setValueInput(e.target.value);
  };
  const handleBlur = (e) => {
    const element = e.target;
    for(let item of props.regexs) {   
      if (item.regex.test(valueInput) === false) {
        element.classList.add(`input-error`);
        setFeedBack(item.display);
        return;
      }
    }
    element.classList.remove(`input-error`);
    element.nextSibling.innerHTML = '';
  };
  const handleFocus = (e) => {
    e.target.classList.remove(`input-error`);
    setFeedBack('');
  };
  return (
    <>
      <input
        spellCheck="false"
        type={props.type}
        placeholder={props.placeholder}
        className={`form-control input-normal ${props.root}__${props.name}`}
        required={true}
        value={valueInput}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <div className={`feedback my-2`}>{feedBack}</div>
    </>
  );
};

export default memo(InputNormal);

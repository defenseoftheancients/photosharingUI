import React from 'react'

const FormGroup = ({children, classname}) => {
  return (
    <div className={'form-group mb-3 ' + (classname === undefined ? '' : classname)}>
        {children}
    </div>
  )
}

export default FormGroup
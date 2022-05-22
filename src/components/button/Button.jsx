import React from 'react'
import './Button.css'

const Button = ({text, ...otherProps }) => {
  return (      
    <button {...otherProps} > {text} </button>
  )
}

export default Button
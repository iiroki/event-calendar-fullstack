import React from 'react'
import { SwatchesPicker } from 'react-color'

const ColorPicker = ({ show, onSelect }) => {
  if (!show) {
    return null
  }

  return (
    <SwatchesPicker
      className='color-picker'
      onChangeComplete={color => onSelect(color.hex.substring(1))}
    />
  )
}

export default ColorPicker

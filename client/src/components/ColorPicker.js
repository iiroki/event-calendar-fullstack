import React from 'react'
import { SwatchesPicker } from 'react-color'

const ColorPicker = ({ show, handleShow, onSelect }) => {
  if (!show) {
    return null
  }

  const colorSelected = color => {
    onSelect(color.hex.substring(1))
    handleShow()
  }

  return (
    <div className='color-picker-container'>
      <SwatchesPicker
        className='color-picker'
        onChangeComplete={color => colorSelected(color)}
      />
    </div>
  )
}

export default ColorPicker

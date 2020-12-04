import React from 'react'
import DatePicker from 'react-datepicker'

const CustomDatePicker = ({ pickTime, current, onSelect }) => {
  if (!pickTime) {
    return (
      <DatePicker
        className='form-control date'
        dateFormat='dd.MM.yyyy'
        selected={current}
        onChange={date => onSelect(date)}
        placeholderText='pp.kk.vvvv'
        showWeekNumbers
        popperPlacement='top-start'
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '-50 0'
          }
        }}
      />
    )
  }

  return (
    <DatePicker
      className='form-control time'
      dateFormat='HH:mm'
      selected={current}
      onChange={time => onSelect(time)}
      placeholderText='hh:mm'
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption='Aika'
      popperPlacement='top-start'
    />
  )
}
export default CustomDatePicker

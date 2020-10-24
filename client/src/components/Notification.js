import React from 'react'
import { useSelector } from 'react-redux'
import { notificationTypes } from '../reducers/notificationReducer'
import { ThumbUpIcon, ThumbDownIcon } from '../assets/icons'

const Notification = () => {
  const { msg, type } = useSelector(state => state.notification)

  // If no message provided
  if (!msg) {
    return (
      <div id='notification'>
        {null}
      </div>
    )
  }

  switch (type) {
    case notificationTypes.GOOD:
      return (
        <div className='alert alert-success' id='notification'>
          <ThumbUpIcon />
          {msg}
        </div>
      )

    case notificationTypes.ERROR:
      return (
        <div className='alert alert-danger' id='notification'>
          <ThumbDownIcon />
          {msg}
        </div>
      )

    default:
      return null
  }
}

export default Notification

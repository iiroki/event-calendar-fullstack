export const notificationTypes = {
  NONE: null,
  GOOD: 0,
  ERROR: 1
}

const initialNotification = {
  msg: null,
  type: notificationTypes.NONE
}

const notificationTime = 10000  // ms
let timer = null

const scrollToNotification = () => {
  const notification = document.getElementById('notification')
  const boundingRect = notification.getBoundingClientRect()

  if (boundingRect.top < 0) {
    notification.scrollIntoView({ behavior: 'smooth' })
  }
}

const notificationReducer = (state = initialNotification, action) => {
  switch (action.type){
    case 'SET_NOTIFICATION':
      return action.data
    
    case 'RESET_NOTIFICATION':
      return initialNotification

    default:
      return state
  }
}

export const setNotification = (msg, type) => (
  thunk => {
    thunk({
      type: 'SET_NOTIFICATION',
      data: { msg, type }
    })

    scrollToNotification()

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      thunk({ type: 'RESET_NOTIFICATION' })
      timer = null
    }, notificationTime)
  }
)

export const expiredTokenNotification = () => (
  thunk => {
    thunk({
      type: 'SET_NOTIFICATION',
      data: {
        msg: 'Kirjautuminen vanhentunut, kirjaudu sisään uudelleen.',
        type: notificationTypes.ERROR
      }
    })

    scrollToNotification()

    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      thunk({ type: 'RESET_NOTIFICATION' })
      timer = null
    }, notificationTime)
  }
)

export default notificationReducer

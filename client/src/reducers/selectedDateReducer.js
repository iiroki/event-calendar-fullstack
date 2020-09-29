const selectedDateReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SELECTED_DATE':
      return action.data

    default:
      return state
  }
}

export const setSelectedDate = date => ({
  type: 'SET_SELECTED_DATE',
  data: date
})

export default selectedDateReducer

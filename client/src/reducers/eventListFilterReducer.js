const initialFilter = {
  title: '',
  user: null,
  upcoming: true
}

const eventListFilterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return {
        ...action.data,
        upcoming: state.upcoming
      }

    case 'SET_UPCOMING':
      return {
        ...state,
        upcoming: action.data
      }

    case 'RESET_FILTER':
      return {
        ...initialFilter,
        upcoming: state.upcoming
      }

    default:
      return state
  }
}

export const setEventListFilter = filter => ({
  type: 'SET_FILTER',
  data: filter
})

export const setEventListUpcoming = value => ({
  type: 'SET_UPCOMING',
  data: value
})

export const resetEventListFilter = () => ({
  type: 'RESET_FILTER'
})

export default eventListFilterReducer

const noFilter = {
  title: '',
  user: null
}

const searchReducer = (state = noFilter, action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.data

    case 'RESET_SEARCH':
      return noFilter

    default:
      return state
  }
}

export const setSearch = filter => ({
  type: 'SET_SEARCH',
  data: filter
})

export const resetSearch = () => ({
  type: 'RESET_SEARCH'
})

export default searchReducer

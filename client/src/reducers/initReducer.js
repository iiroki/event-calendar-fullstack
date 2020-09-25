const initReducer = (state = false, action) => {
  switch (action.type) {
    case 'INIT_DONE':
      return true

    default:
      return state
  }
}

export const initialized = () => ({ type: 'INIT_DONE' })

export default initReducer

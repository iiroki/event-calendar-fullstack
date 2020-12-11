import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import eventReducer from './reducers/eventReducer'
import userReducer from './reducers/userReducer'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import initReducer from './reducers/initReducer'
import selectedDateReducer from './reducers/selectedDateReducer'
import searchReducer from './reducers/searchReducer'

const reducers = combineReducers({
  events: eventReducer,
  users: userReducer,
  login: loginReducer,
  notification: notificationReducer,
  init: initReducer,
  selectedDate: selectedDateReducer,
  search: searchReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store

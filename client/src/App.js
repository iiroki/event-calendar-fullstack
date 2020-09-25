import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { checkLogin } from './reducers/loginReducer'
import { initEvents } from './reducers/eventReducer'
import { initUsers } from './reducers/userReducer'
import { setNotification, notificationTypes } from './reducers/notificationReducer'
import { initialized } from './reducers/initReducer'

import NavigationMenu from './components/NavigationMenu'
import EventCalendar from './components/EventCalendar'
import EventPage from './components/EventPage'
import ManagePage from './components/ManagePage'
import LoginPage from './components/LoginPage'
import Banner from './components/Banner'
import Notification from './components/Notification'
import AboutPage from './components/AboutPage'
import LinksPage from './components/LinksPage'
import AdBox from './components/AdBox'
import Footer from './components/Footer'
import LoadingIcon from './components/LoadingIcon'

import './App.css'

const App = () => {
  const init = useSelector(state => state.init)
  const dispatch = useDispatch()

  // Fetching active login and events after the first render
  useEffect(() => {
    const init = async () => {
      try {
        await dispatch(checkLogin())
        await dispatch(initEvents())
        await dispatch(initUsers())
        dispatch(initialized())
      } catch {
        dispatch(setNotification(
          'Virhe ladattaessa kalenteria.',
          notificationTypes.ERROR
        ))
      }
    }
    init()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Checking if the route matches -> single event page
  const eventMatch = useRouteMatch('/events/:id')

  const eventId = eventMatch
    ? eventMatch.params.id
    : null

  return (
    <div>

      <Banner />

      <NavigationMenu />

      <div className='container'>
        <Notification />

        <Switch>

          <Route path='/events/:id'>
            {
              init
                ? <EventPage id={eventId} />
                : <LoadingIcon />
            }
          </Route>

          <Route path='/about'>
            <AboutPage />
          </Route>

          <Route path='/links'>
            <LinksPage />
          </Route>

          <Route path='/manage'>
            <ManagePage />
          </Route>

          <Route path='/login'>
            <LoginPage />
          </Route>

          <Route path='/'>
            {
              init
                ? <EventCalendar />
                : <LoadingIcon />
            }
          </Route>

        </Switch>

        <hr/>
        <AdBox />
        <hr/>
        <Footer />
      </div>
    </div>
  )
}

export default App;

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { checkLogin } from './reducers/loginReducer'
import { initEvents } from './reducers/eventReducer'
import { initUsers } from './reducers/userReducer'
import {
  setNotification,
  expiredTokenNotification,
  notificationTypes
} from './reducers/notificationReducer'
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

// Show ads or not
const SHOW_ADS = true

const App = () => {
  const init = useSelector(state => state.init)
  const dispatch = useDispatch()

  // Fetching active login and events after the first render
  useEffect(() => {
    const initState = async () => {
      try {
        await dispatch(checkLogin())
      } catch (error) {
        dispatch(expiredTokenNotification())
      }

      try {
        await dispatch(initEvents())
        await dispatch(initUsers())
        dispatch(initialized())
      } catch (error) {
        dispatch(setNotification(
          'Virhe ladattaessa kalenteria.',
          notificationTypes.ERROR
        ))
      }
    }
    initState()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Checking if the route matches -> single event page
  const eventMatch = useRouteMatch('/events/:id')

  const eventId = eventMatch
    ? eventMatch.params.id
    : null

  return (
    <div className='background' style={{ backgroundImage: 'url(/bg.png)' }}>

      <Banner />

      <NavigationMenu />

      <div>

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
              {
                init
                  ? <AboutPage />
                  : <LoadingIcon />
              }
            </Route>

            <Route path='/links'>
              {
                init
                  ? <LinksPage />
                  : <LoadingIcon />
              }
            </Route>

            <Route path='/manage'>
              {
                init
                  ? <ManagePage />
                  : <LoadingIcon />
              }
            </Route>

            <Route path='/login'>
              {
                init
                  ? <LoginPage />
                  : <LoadingIcon />
              }
            </Route>

            <Route path='/'>
              {
                init
                  ? <EventCalendar />
                  : <LoadingIcon />
              }
            </Route>

          </Switch>
          
          {
            SHOW_ADS
              ? (
                <div>
                  <hr />
                  <AdBox />
                </div>
              )
              : null
          }
          <hr />
          <Footer />
        </div>

      </div>

    </div>
  )
}

export default App

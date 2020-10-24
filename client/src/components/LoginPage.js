import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

const LoginPage = () => {
  const loggedUser = useSelector(state => state.login)

  // Redirect to manage page if already logged in
  if (loggedUser) {
    return (
      <Redirect to='/manage' />
    )
  }

  return (
    <div className='login-page'>
      <h4>Kirjaudu sisään hallitaksesi tapahtumiasi.</h4>
      <LoginForm />
    </div>
  )
}

export default LoginPage

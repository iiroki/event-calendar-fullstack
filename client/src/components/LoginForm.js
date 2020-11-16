import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import { setNotification, notificationTypes } from '../reducers/notificationReducer'

// Form that takes the login credentials and makes login attempts
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await dispatch(setLogin({
        username,
        password
      }))

      dispatch(setNotification(
        'Kirjauduttu sisään onnistuneesti :)',
        notificationTypes.GOOD
      ))
    } catch (error) {
      // Wrong username/password or inactive account
      if (error.response.status === 401) {
        if (error.response.data.error.code === 5) {
          dispatch(setNotification(
            'Ei-aktiivinen käyttäjätunnus.',
            notificationTypes.ERROR
          ))
        } else {
          dispatch(setNotification(
            'Virheellinen käyttäjätunnus ja/tai salasana.',
            notificationTypes.ERROR
          ))
        }
      } else {
        dispatch(setNotification(
          'Virhe kirjautumisen yhteydessä :(',
          notificationTypes.ERROR
        ))
      }
    }
  }

  return (
    <div>
      <form className='login-form' onSubmit={handleSubmit}>
        <table>
          <tbody>

            <tr>
              <td>
                <input
                  type='text'
                  className='form-control'
                  id='usernameInput'
                  value={username}
                  onChange={({ target }) => setUsername(target.value)}
                  placeholder='Käyttäjätunnus'
                />
              </td>
            </tr>

            <tr>
              <td>
                <input
                  type='password'
                  className='form-control'
                  id='passwordInput'
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder='Salasana'
                />
              </td>
            </tr>

            <tr>
              <td>
                <button
                  type='submit'
                  className='btn btn-treekkari login-form-button'
                >
                  Kirjaudu
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </form>
    </div>
  )
}

export default LoginForm

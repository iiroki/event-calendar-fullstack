import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../services/users'
import { updateLogin } from '../reducers/loginReducer'
import {
  setNotification,
  expiredTokenNotification,
  notificationTypes } from '../reducers/notificationReducer'
import { AlertIcon } from '../assets/icons'

// Form where user information can be changed
// handleHide can be provided to hide the form after successful submit
const UserInformationForm = ({ profile, handleHide = null }) => {
  if (!profile.link) {
    profile.link = ''
  }

  const [name, setName] = useState(profile.name)
  const [username, setUsername] = useState(profile.username)
  const [link, setLink] = useState(profile.link)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  // Event handler for submitting the form
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await userService.updateInformation(profile.id, {
        name,
        username,
        link,
        password
      })

      // Updating login information after the change
      dispatch(updateLogin({
        username,
        name,
        link
      }))

      // Hide the form after successful submit
      if (handleHide) {
        handleHide()
      }

      dispatch(setNotification(
        'Tietoja muokattu onnistuneesti.',
        notificationTypes.GOOD
      ))
    } catch (error) {
      if (error.response.status === 400) {
        dispatch(setNotification(
          'Virhe tietoja muokatessa: Nimi/käyttäjätunnus ei saa olla tyhjä ja käyttäjätunnuksen tulee olla uniikki!',
          notificationTypes.ERROR
        ))
      } else if (error.response.status === 401) {
        if (error.response.data.error.code === 2) {  // Token expired
          dispatch(expiredTokenNotification())
        } else {
          dispatch(setNotification(
            'Virheellinen nykyinen salasana.',
            notificationTypes.ERROR
          ))
        }
        
      } else {
        dispatch(setNotification(
          'Virhe tietojen päivittämisen yhteydessä.',
          notificationTypes.ERROR
        ))
      }
    }
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <div className='row form-row'>
        <label className='col-lg-3 form-row-label'>
          Nimi
        </label>
        <div className='col-lg-4'>
          <input
            type='text'
            className='form-control'
            id='editNameInput'
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        
      </div>

      <div className='row form-row'>
        <label className='col-lg-3 form-row-label'>
          Käyttäjätunnus
        </label>
        <div className='col-lg-4'>
          <input
            type='text'
            className='form-control'
            id='editUsernameInput'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
      </div>

      <div className='row form-row'>
        <label className='col-lg-3 form-row-label'>
          Linkki
        </label>
        <div className='col-lg-4'>
          <input
            type='text'
            className='form-control'
            id='editLinkInput'
            value={link}
            onChange={({ target }) => setLink(target.value)}
            placeholder='ei linkkiä'
          />
          <small className='form-text text-muted form-help-text'>
            Linkin tulee alkaa http:// tai https:// (esim. https://www.linkki.fi)
          </small>
        </div>
      </div>

      <div className='row form-row'>
        <label className='col-lg-3 form-row-label'>
          Nykyinen salasana
        </label>
        <div className='col-lg-4'>
          <input
            type='password'
            className='form-control'
            id='editPasswordInput'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>

      <div className='row form-row'>
        <AlertIcon />
        Nykyinen salasana vaaditaan muutosten vahvistamiseen.
      </div>

      <div>
        <button type='submit' className='btn btn-danger'>
          Vahvista
        </button>
      </div>
    </form>
  )
}

// Form where password can be changed
// handleHide can be provided to hide the form after successful submit
const NewPasswordForm = ({ id, handleHide = null }) => {
  const [password, setPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [newPasswordVerification, setnewPasswordVerification] = useState('')
  const dispatch = useDispatch()

  // Event handler for submitting the form
  const handleSubmit = async event => {
    event.preventDefault()

    if (newPassword.length < 3) {
      dispatch(setNotification(
        'Salasanan on oltava vähintään kolme merkkiä pitkä.',
        notificationTypes.ERROR
      ))

      return
    }

    // Given new passwords don't match
    if (newPassword !== newPasswordVerification) {
      dispatch(setNotification(
        'Salasanat eivät täsmää.',
        notificationTypes.ERROR
      ))

      return
    }

    try {
      await userService.updatePassword(id, {
        password,
        newPassword
      })

      // Hide the form after successful submit
      if (handleHide) {
        handleHide()
      }

      dispatch(setNotification(
        'Salasana vaihdettu.',
        notificationTypes.GOOD
      ))
    } catch (error) {
      // Wrong current password
      if (error.response.status === 401) {
        if (error.response.data.error.code === 2) {  // Token expired
          dispatch(expiredTokenNotification())
        } else {
          dispatch(setNotification(
            'Virheellinen nykyinen salasana.',
            notificationTypes.ERROR
          ))
        }
      } else {
        dispatch(setNotification(
          'Virhe salasanan vaihdon yhteydessä :(',
          notificationTypes.ERROR
        ))
      }      
    }
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
        <div className='row form-row'>
          <label className='col-lg-3 form-row-label'>
            Nykyinen salasana
          </label>
          <div className='col-lg-4'>
            <input
              type='password'
              className='form-control'
              id='editPasswordInput'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          
        </div>

        <div className='row form-row'>
          <label className='col-lg-3 form-row-label'>
            Uusi salasana
          </label>
          <div className='col-lg-4'>
            <input
              type='password'
              className='form-control'
              id='editnewPasswordInput'
              value={newPassword}
              onChange={({ target }) => setnewPassword(target.value)}
            />
          </div>
        </div>

        <div className='row form-row'>
          <label className='col-lg-3 form-row-label'>
            Vahvista uusi salasana
          </label>
          <div className='col-lg-4'>
            <input
              type='password'
              className='form-control'
              id='editnewPasswordVerificationInput'
              value={newPasswordVerification}
              onChange={({ target }) => setnewPasswordVerification(target.value)}
            />
          </div>
        </div>

        <div>
          <button type='submit' className='btn btn-danger'>
            Vahvista
          </button>
        </div>
      </form>
  )
}

// Profile form where userinformation or password can be changed
const ProfileForm = ({ profile, handleHide }) => {
  // User information is edited by default
  const [editPassword, setEditPassword] = useState(false)

  return (
    <div>
      <div className='btn-group btn-group-toggle button-group' data-toggle='buttons'>
        <label className='btn btn-danger active' onClick={() => setEditPassword(false)}>
          <input type='radio' name='options' id='option1' autoComplete='off'/> Tiedot
        </label>

        <label className='btn btn-danger' onClick={() => setEditPassword(true)}>
          <input type='radio' name='options' id='option2' autoComplete='off' /> Salasana
        </label>
      </div>

      {
        editPassword
          ? <NewPasswordForm id={profile.id} handleHide={handleHide} />
          : <UserInformationForm profile={profile} handleHide={handleHide} />
      }
    </div>
  )
}

export default ProfileForm

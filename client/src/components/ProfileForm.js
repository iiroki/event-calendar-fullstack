import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import userService from '../services/users'
import { updateLogin } from '../reducers/loginReducer'
import {
  setNotification,
  expiredTokenNotification,
  notificationTypes
} from '../reducers/notificationReducer'
import { AlertIcon, CloseColorPickerIcon } from '../assets/icons'
import ColorPicker from './ColorPicker'

// Form where user information can be changed
// handleHide can be provided to hide the form after successful submit
const UserInformationForm = ({ profile, handleHide = null }) => {
  if (!profile.link) {
    profile.link = '' // eslint-disable-line
  }

  const [name, setName] = useState(profile.name)
  const [username, setUsername] = useState(profile.username)
  const [link, setLink] = useState(profile.link)
  const [bgColor, setBgColor] = useState(profile.bgColor)
  const [fgColor, setFgColor] = useState(profile.fgColor)
  const [showBgCp, setShowBgCp] = useState(false)
  const [showFgCp, setShowFgCp] = useState(false)
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const validateFields = () => {
    const hexRegex = new RegExp(/^[0-9A-F]{6}$/i)
    const errors = []

    if (name.trim().length === 0) {
      errors.push('Nimi ei voi olla tyhjä')
    }

    if (username.trim().length === 0) {
      errors.push('Käyttäjätunnus ei voi olla tyhjä')
    }

    if (bgColor.length !== 6 || fgColor.length !== 6) {
      errors.push('Värien HEX-arvot tulee olla kuusimerkkisiä')
    } else if (!hexRegex.test(bgColor) || !hexRegex.test(fgColor)) {
      errors.push('Virheellinen värin HEX-arvo')
    }

    return errors
  }

  // Event handler for submitting the form
  const handleSubmit = async event => {
    event.preventDefault()

    const errors = validateFields()

    if (errors.length !== 0) {
      const errorMsgs = errors.join('\n')

      dispatch(setNotification(
        `Tapahtuman tiedoissa virheitä:\n${errorMsgs}`,
        notificationTypes.ERROR
      ))

      return
    }

    try {
      await userService.updateInformation(profile.id, {
        name,
        username,
        link,
        bgColor,
        fgColor,
        password
      })

      // Updating login information after the change
      dispatch(updateLogin({
        username,
        name,
        link,
        bgColor,
        fgColor
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
          'Virhe tietoja muokatessa: Nimi/käyttäjätunnus ei saa olla tyhjä ja '
          + 'käyttäjätunnuksen tulee olla uniikki! Tarkasta myös värien HEX-arvot.',
          notificationTypes.ERROR
        ))
      } else if (error.response.status === 401) {
        if (error.response.data.error.code === 2) { // Token expired
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

  const toggleBgColorPicker = () => {
    if (!showBgCp && showFgCp) setShowFgCp(false)
    setShowBgCp(!showBgCp)
  }

  const toggleFgColorPicker = () => {
    if (!showFgCp && showBgCp) setShowBgCp(false)
    setShowFgCp(!showFgCp)
  }

  return (
    <form className='input-form' onSubmit={handleSubmit}>
      <div className='row form-row'>
        <label
          htmlFor='editNameInput'
          className='col-lg-3 form-row-label'
        >
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
        <label
          htmlFor='editUsernameInput'
          className='col-lg-3 form-row-label'
        >
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
        <label
          htmlFor='editLinkInput'
          className='col-lg-3 form-row-label'
        >
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
        </div>
      </div>

      <div className='row form-row'>
        <label
          htmlFor='editBgColorInput'
          className='col-lg-3 form-row-label'
        >
          Taustaväri (HEX-arvo)
        </label>
        <div className='col-lg-4'>
          <div className='input-group form-input-group'>
            <div className='input-group-prepend'>
              <div className='input-group-text preinput-label'>#</div>
            </div>

            <input
              type='text'
              className='form-control hex preinput-text'
              id='editBgColorInput'
              value={bgColor}
              onChange={({ target }) => setBgColor(target.value)}
              placeholder='ffffff'
            />

            <div className='input-group-append'>
              <span className='input-group-text preinput-label'>
                {
                  showBgCp
                    ? (
                      <span
                        className='color-pointer'
                        onClick={toggleBgColorPicker}
                      >
                        <CloseColorPickerIcon />
                      </span>
                    )
                    : (
                      <span
                        className='color-square color-pointer'
                        style={{ backgroundColor: `#${bgColor}` }}
                        onClick={toggleBgColorPicker}
                      />
                    )
                }
              </span>
            </div>
          </div>

          <ColorPicker
            show={showBgCp}
            handleShow={toggleBgColorPicker}
            onSelect={setBgColor}
          />
        </div>
      </div>

      <div className='row form-row'>
        <label
          htmlFor='editFgColorInput'
          className='col-lg-3 form-row-label'
        >
          Tekstin väri (HEX-arvo)
        </label>
        <div className='col-lg-4'>
          <div className='input-group form-input-group'>
            <div className='input-group-prepend'>
              <div className='input-group-text preinput-label'>#</div>
            </div>

            <input
              type='text'
              className='form-control hex preinput-text'
              id='editFgColorInput'
              value={fgColor}
              onChange={({ target }) => setFgColor(target.value)}
              placeholder='000000'
            />

            <div className='input-group-append'>
              <span className='input-group-text preinput-label'>
                {
                  showFgCp
                    ? (
                      <span
                        className='color-pointer'
                        onClick={toggleFgColorPicker}
                      >
                        <CloseColorPickerIcon />
                      </span>
                    )
                    : (
                      <span
                        className='color-square color-pointer'
                        style={{ backgroundColor: `#${fgColor}` }}
                        onClick={toggleFgColorPicker}
                      />
                    )
                }
              </span>
            </div>
          </div>

          <ColorPicker
            show={showFgCp}
            handleShow={toggleFgColorPicker}
            onSelect={setFgColor}
          />
        </div>
      </div>

      <br />
      <br />

      <div className='row form-row'>
        <label
          htmlFor='passwordConfirmInput'
          className='col-lg-3 form-row-label'
        >
          Nykyinen salasana
        </label>
        <div className='col-lg-4'>
          <input
            type='password'
            className='form-control'
            id='passwordConfirmInput'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </div>

      <div className='row form-row'>
        <AlertIcon />
        Nykyinen salasana vaaditaan muutosten vahvistamiseen. Muokatut tiedot
        päivittyvät tapahtumiin sivun uudelleenlataamisen yhteydessä.
      </div>

      <div>
        <button
          type='submit'
          className='btn btn-treekkari'
        >
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
        if (error.response.data.error.code === 2) { // Token expired
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
        <label
          htmlFor='editPasswordInput'
          className='col-lg-3 form-row-label'
        >
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
        <label
          htmlFor='editNewPasswordInput'
          className='col-lg-3 form-row-label'
        >
          Uusi salasana
        </label>
        <div className='col-lg-4'>
          <input
            type='password'
            className='form-control'
            id='editNewPasswordInput'
            value={newPassword}
            onChange={({ target }) => setnewPassword(target.value)}
          />
        </div>
      </div>

      <div className='row form-row'>
        <label
          htmlFor='editNewPasswordConfirmInput'
          className='col-lg-3 form-row-label'
        >
          Vahvista uusi salasana
        </label>
        <div className='col-lg-4'>
          <input
            type='password'
            className='form-control'
            id='editNewPasswordConfirmInput'
            value={newPasswordVerification}
            onChange={({ target }) => setnewPasswordVerification(target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type='submit'
          className='btn btn-treekkari'
        >
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
        <span
          className='btn btn-treekkari active'
          role='button'
          onClick={() => setEditPassword(false)}
          tabIndex={0}
          onKeyPress={() => setEditPassword(false)}
        >
          <input type='radio' name='options' id='option1' autoComplete='off' />
          Tiedot
        </span>

        <span
          className='btn btn-treekkari'
          role='button'
          onClick={() => setEditPassword(true)}
          tabIndex={0}
          onKeyPress={() => setEditPassword(true)}
        >
          <input type='radio' name='options' id='option2' autoComplete='off' />
          Salasana
        </span>
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

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfileForm from './ProfileForm'

// Profile
const Profile = ({ profile }) => (
  <div className='profile'>
    <div className='form-row'>
      <label className='form-row-label'> {/* eslint-disable-line */}
        Nimi:
      </label>
      {profile.name}
    </div>

    <div className='form-row'>
      <label className='form-row-label'> {/* eslint-disable-line */}
        Käyttäjätunnus:
      </label>
      {profile.username}
    </div>

    <div className='form-row'>
      <label
        htmlFor='profileLink'
        className='form-row-label'
      >
        Linkki:
      </label>
      {
        profile.link
          ? (
            <a
              id='profileLink'
              href={`//${profile.link}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              {profile.link}
            </a>
          )
          : <i id='profileLink'>(tyhjä)</i>
      }
    </div>

    <div className='form-row'>
      <label
        htmlFor='profileBgColor'
        className='form-row-label'
      >
        Taustaväri:
      </label>
      <div
        id='profileBgColor'
        className='color-square'
        style={{ backgroundColor: `#${profile.bgColor}` }}
      />
    </div>

    <div className='form-row'>
      <label
        htmlFor='profileFgColor'
        className='form-row-label'
      >
        Tekstin väri:
      </label>
      <div
        id='profileFgColor'
        className='color-square'
        style={{ backgroundColor: `#${profile.fgColor}` }}
      />
    </div>
  </div>
)

// Element containing the profile and also enables profile editing
const ManageProfile = () => {
  const profile = useSelector(state => state.login)
  const [edit, setEdit] = useState(false)
  // Changing edit state
  const handleSetEdit = () => setEdit(!edit)

  return (
    <div>
      <button
        type='button'
        className='btn btn-treekkari'
        onClick={() => handleSetEdit()}
      >
        {
          edit
            ? 'Palaa'
            : 'Muokkaa'
        }
      </button>

      <hr />

      {
        edit
          ? <ProfileForm profile={profile} handleHide={handleSetEdit} />
          : <Profile profile={profile} />
      }
    </div>
  )
}

export default ManageProfile

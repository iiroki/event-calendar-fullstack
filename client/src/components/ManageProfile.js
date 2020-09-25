import React, { useState } from 'react'
import { useSelector} from 'react-redux'
import ProfileForm from './ProfileForm'

// Profile
const Profile = ({ profile }) => (
  <div className='profile'>
    <div className='form-row'>
      <label className='form-row-label'>
        Nimi:
      </label>
      {profile.name}
    </div>

    <div className='form-row'>
      <label className='form-row-label'>
        Käyttäjätunnus:
      </label>
      {profile.username}
    </div>

    <div className='form-row'>
      <label className='form-row-label'>
        Linkki:
      </label>
      {
        profile.link
          ? <a href={profile.link}>
              {profile.link}
            </a>
          : <i>(tyhjä)</i>
      }
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
        className='btn btn-danger'
        onClick={() => handleSetEdit()}
      >
        {
          edit
            ? 'Palaa'
            : 'Muokkaa'
        }
      </button>

      <hr/>

      {
        edit
          ? <ProfileForm profile={profile} handleHide={handleSetEdit} />
          : <Profile profile={profile} />
      }
    </div>
  )
}

export default ManageProfile

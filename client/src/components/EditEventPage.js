import React from 'react'
import EventForm from './EventForm'

const EditEventPage = ({ eventToModify, backHandler }) => (
  <div>
    <button
      type='button'
      onClick={backHandler}
    >
      Back
    </button>

    <h1>
      {`Muokataan tapahtumaa: ${eventToModify.title}`}
    </h1>

    <EventForm eventoToModify={eventToModify} />
  </div>
)

export default EditEventPage

import React from 'react'
import EventForm from './EventForm'

const EditEventPage = ({ eventToModify, backHandler }) => (
  <div>
    <button
      type='button'
      className='btn btn-danger'
      onClick={backHandler}
    >
      Takaisin
    </button>

    <hr />

    <h5>
      <b>
        {`Muokataan tapahtumaa: ${eventToModify.title}`}
      </b>
    </h5>

    <EventForm eventoToModify={eventToModify} />
  </div>
)

export default EditEventPage

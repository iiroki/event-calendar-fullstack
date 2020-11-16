import React from 'react'
import EventForm from './EventForm'

const EditEventPage = ({ eventToModify, backHandler }) => (
  <div>
    <button
      type='button'
      className='btn btn-treekkari'
      onClick={backHandler}
    >
      Takaisin
    </button>

    <hr />

    <h5>
      Muokataan tapahtumaa:
      <b>
        {` ${eventToModify.title}`}
      </b>
    </h5>

    <EventForm
      eventoToModify={eventToModify}
      editDoneHandler={backHandler}
    />
  </div>
)

export default EditEventPage

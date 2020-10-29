import React from 'react'
import EventForm from './EventForm'

const EditEventPage = ({ eventToModify }) => (
  <h1>
    {`Muokataan tapahtumaa: ${eventToModify.title}`}
  </h1>
)

export default EditEventPage

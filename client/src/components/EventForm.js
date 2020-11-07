import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import {
  addNewEvent,
  editExistingEvent
} from '../reducers/eventReducer'
import {
  setNotification,
  expiredTokenNotification,
  notificationTypes
} from '../reducers/notificationReducer'
import { HelpIcon, AlertIcon } from '../assets/icons'

const defaultValues = {
  title: '',
  location: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  multi: false,
  description: ''
}

const getFieldValues = eventObject => {
  if (!eventObject) {
    return defaultValues
  }

  const start = moment(eventObject.start)
  const end = moment(eventObject.end)

  return {
    title: eventObject.title,
    location: eventObject.location,
    startDate: start.format('DD.MM.YYYY'),
    startTime: start.format('HH:mm'),
    endDate: end.format('DD.MM.YYYY'),
    endTime: end.format('HH:mm'),
    multi: eventObject.multi,
    description: eventObject.description
  }
}

// Event form for adding new event
const EventForm = ({ eventoToModify = null, editDoneHandler = null }) => {
  const values = getFieldValues(eventoToModify)

  const [title, setTitle] = useState(values.title)
  const [location, setLocation] = useState(values.location)
  const [startDate, setStartDate] = useState(values.startDate)
  const [startTime, setStartTime] = useState(values.startTime)
  const [endDate, setEndDate] = useState(values.endDate)
  const [endTime, setEndTime] = useState(values.endTime)
  const [multi, setMulti] = useState(values.multi)
  const [description, setDescription] = useState(values.description)

  const dispatch = useDispatch()

  // Parses Dates and times to correct form for the server
  const parseDateTime = (date, time) => {
    const d = date.split('.').reverse().join('-')
    const t = time.split('.').join(':')
    return `${d} ${t}`
  }
  // Checks that given date is valid
  const validateDate = date => moment(date, 'D.M.YYYY', true).isValid()

  // Checks that given time is valid
  const validateTime = time => moment(time, 'H:mm', true).isValid()

  // Validates all the fields and returns all errors in array
  const validateFields = () => {
    const errors = []

    if (title.length === 0) {
      errors.push('Tapahtuman nimi nimi ei voi olla tyhjä')
    }

    if (location.length === 0) {
      errors.push('Tapahtumapaikka ei voi olla tyhjä')
    }

    if (!validateDate(startDate)) {
      errors.push('Virheellinen alkamispäivämäärä')
    }

    if (!validateTime(startTime)) {
      errors.push('Virheellinen alkamiskellonaika')
    }

    if (!validateDate(endDate)) {
      errors.push('Virheellinen päättymispäivämäärä')
    }

    if (!validateTime(endTime)) {
      errors.push('Virheellinen päättymiskellonaika')
    }

    const s = moment(`${startDate} ${startTime}`, 'D.M.YYYY H:mm')
    const e = moment(`${endDate} ${endTime}`, 'D.M.YYYY H:mm')

    if (s.isAfter(e)) {
      errors.push('Päättymisajankohta ennen alkamisajankohtaa')
    }

    return errors
  }

  const handleAddNew = async event => {
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

    const start = parseDateTime(startDate, startTime)
    const end = parseDateTime(endDate, endTime)

    try {
      await dispatch(addNewEvent({
        title,
        location,
        start,
        end,
        multi,
        description
      }))

      dispatch(setNotification(
        `Uusi tapahtuma "${title}" lisätty onnistuneesti.`,
        notificationTypes.GOOD
      ))

      setTitle('')
      setLocation('')
      setStartDate('')
      setStartTime('')
      setEndDate('')
      setEndTime('')
      setMulti(false)
      setDescription('')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(expiredTokenNotification())
      } else {
        dispatch(setNotification(
          'Virhe tapahtumaa lisättäessä.',
          notificationTypes.ERROR
        ))
      }
    }
  }

  const handleEdit = async event => {
    event.preventDefault()

    // No values changed
    if (values.title === title
        && values.location === location
        && values.startDate === startDate
        && values.startTime === startTime
        && values.endDate === endDate
        && values.endTime === endTime
        && values.multi === multi
        && values.description === description) {
      dispatch(setNotification(
        `Ei muutoksia tapahtumaan ${title}.`,
        notificationTypes.GOOD
      ))

      if (editDoneHandler) {
        editDoneHandler()
      }

      return
    }

    const errors = validateFields()

    if (errors.length !== 0) {
      const errorMsgs = errors.join('\n')

      dispatch(setNotification(
        `Tapahtuman tiedoissa virheitä:\n${errorMsgs}`,
        notificationTypes.ERROR
      ))

      return
    }

    const start = parseDateTime(startDate, startTime)
    const end = parseDateTime(endDate, endTime)

    try {
      await dispatch(editExistingEvent({
        id: eventoToModify.id,
        title,
        location,
        start,
        end,
        multi,
        description
      }))

      dispatch(setNotification(
        `Tapahtumaa ${title} muokattu onnistuneesti.`,
        notificationTypes.GOOD
      ))

      if (editDoneHandler) {
        editDoneHandler()
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        dispatch(expiredTokenNotification())
      } else {
        dispatch(setNotification(
          'Virhe tapahtumaa muokatessa.',
          notificationTypes.ERROR
        ))
      }
    }
  }

  return (
    <div>
      <form
        className='input-form'
        onSubmit={
          eventoToModify === null
            ? handleAddNew
            : handleEdit
        }
      >

        <div className='row form-row'>
          <label
            htmlFor='titleInput'
            className='col-lg-3 form-row-label'
          >
            Nimi*
          </label>
          <div className='col-lg-4'>
            <input
              type='text'
              className='form-control'
              id='titleInput'
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder='Colours'
            />
          </div>
        </div>

        <div className='row form-row'>
          <label
            htmlFor='locationInput'
            className='col-lg-3 form-row-label'
          >
            Paikka*
          </label>
          <div className='col-lg-4'>
            <input
              type='text'
              className='form-control'
              id='locationInput'
              value={location}
              onChange={({ target }) => setLocation(target.value)}
              placeholder='Viihdemaailma Ilona'
            />
          </div>
        </div>

        <div className='row form-row'>
          <label
            htmlFor='startDateInput startTimeInput'
            className='col-lg-3 form-row-label'
          >
            Alkamisajankohta*
          </label>
          <div className='col-lg-4'>
            <i>pvm</i>
            <input
              type='text'
              className='form-control date'
              id='startDateInput'
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
              placeholder='pp.kk.vvvv'
            />
            <i>klo</i>
            <input
              type='text'
              className='form-control time'
              id='startTimeInput'
              value={startTime}
              onChange={({ target }) => setStartTime(target.value)}
              placeholder='hh:mm'
            />
          </div>
        </div>

        <div className='row form-row'>
          <label
            htmlFor='endDateInput endTimeInput'
            className='col-lg-3 form-row-label'
          >
            Päättymisajankohta*
          </label>
          <div className='col-lg-4'>
            <i>pvm</i>
            <input
              type='text'
              className='form-control date'
              id='endDateInput'
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
              placeholder='pp.kk.vvvv'
            />
            <i>klo</i>
            <input
              type='text'
              className='form-control time'
              id='endTimeInput'
              value={endTime}
              onChange={({ target }) => setEndTime(target.value)}
              placeholder='hh:mm'
            />
          </div>
        </div>

        <div className='row form-row form-row-checkbox'>
          <label
            className='form-row-label'
          >
            Näytä tapahtuma kalenterissa monipäiväisenä
            <button
              type='button'
              className='manage-event-button'
              data-toggle='modal'
              data-target='#multiHelpModal'
            >
              <HelpIcon />
            </button>
          </label>
          <div>
            <input
              type='checkbox'
              className='form-checkbox'
              checked={multi}
              onChange={({ target }) => setMulti(target.checked)}
            />
          </div>
        </div>

        <label
          htmlFor='descriptionInput'
          className='form-row-label'
        >
          Kuvaus
        </label>
        <div>
          <textarea
            type='text'
            className='form-control big-text'
            id='descriptionInput'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>

        <div className='alert-message'>
          <AlertIcon />
          Kuvaus-laatikkoa voi venyttää suuremmaksi oikeasta alakulmasta!
          <br />
          * = Pakollinen kenttä
        </div>

        <button type='submit' className='btn btn-danger'>
          {
            eventoToModify === null
              ? 'Lisää tapahtuma'
              : 'Vahvista'
          }
        </button>
      </form>

      <div
        className='modal fade'
        id='multiHelpModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='multiHelpModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>

            <div className='modal-header modal-center'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Näytä tapahtuma kalenterissa monipäiväisenä
              </h5>
            </div>

            <div className='modal-body modal-text-content'>
              Esimerkki: Tapahtuma alkaa 22.00 ja päättyy seuraavan päivän puolella 3.00.
              Mikäli valintaruutua ei ole valittu, näkyy tapahtuma ainoastaan aloituspäivän
              kohdalla kalenterissa. Jos valintaruutu on valittuna, näkyy tapahtuma kalenterissa
              molempien päivien kohdalla. Tilanteet kuvattu alla olevassa kuvassa.
            </div>

            <img
              className='modal-pic'
              src='/multi_modal_pic.png'
              alt='Multi Help'
            />

            <div className='modal-body modal-text-content'>
              Valintaruutu suositellaan jättämään tyhjäksi esimerkiksi baaribileiden kohdalla
              (tapahtuma ajoittuu selkeästi aloituspäivän puolelle), kun taas oikeasti usean
              päivän tapahtumien tapauksessa (esimerkiksi vuosijuhlaviikonloppu) toimintoa
              voi hyödyntää.
            </div>

            <div className='modal-footer modal-center'>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'
              >
                Sulje
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EventForm

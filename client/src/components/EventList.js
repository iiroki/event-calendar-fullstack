import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { isAfter } from 'date-fns'
import {
  setEventListFilter,
  setEventListUpcoming,
  resetEventListFilter
} from '../reducers/eventListFilterReducer'
import eventDateFormat from '../utils/eventDateFormat'
import { SearchIcon, UnfilterIcon } from '../assets/icons'

const EventListItem = ({ e }) => {
  const history = useHistory()

  const handleEventSelect = () => {
    history.push(`/events/${e.id}`)
  }

  return (
    <div
      className='event-list-item'
      role='button'
      onClick={handleEventSelect}
      tabIndex={0}
      onKeyPress={handleEventSelect}
      style={{
        backgroundColor: `#${e.bgColor}`
      }}
    >
      <div
        className='event-list-item-box'
        style={{ color: `#${e.fgColor}` }}
      >
        <div className='event-list-item-title'>
          {`${e.title}`}
        </div>
        <div className='event-list-item-date'>
          {eventDateFormat(e.start, e.end)}
        </div>
      </div>
    </div>
  )
}

const UserDropdownItem = ({ u, handleSelect }) => (
  <span
    className='dropdown-item user-dropdown-item'
    role='button'
    onClick={() => {
      handleSelect(u.id)
    }}
    tabIndex={0}
    onKeyPress={() => handleSelect(u.id)}
  >
    {u.name}
  </span>
)

const UserDropdown = ({ users, filter, handleSelect }) => {
  const [current, setCurrent] = useState(filter)

  const updateFilter = id => {
    setCurrent(id)
    handleSelect(id)
  }

  const user = users.find(u => u.id === current)

  return (
    <div>
      <button className='btn dropdown-toggle btn-treekkari user-filter' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
        {
          current
            ? user.name
            : 'Etsi tapahtuman järjestäjällä'
        }
      </button>
      <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
        <span
          className='dropdown-item user-dropdown-item'
          role='button'
          onClick={() => updateFilter(null)}
          tabIndex={0}
          onKeyPress={() => updateFilter(null)}
        >
          Ei valittu
        </span>
        <hr style={{ margin: '2px 10px' }} />
        {
          users.map(u => <UserDropdownItem key={u.id} u={u} handleSelect={updateFilter} />)
        }
      </div>
    </div>
  )
}

const EventSearchBar = ({ users, filter, setFilter }) => {
  const [titleFilter, setTitleFilter] = useState(filter.title)
  const [userFilter, setUserFilter] = useState(filter.user)

  const handleSearch = () => {
    setFilter(titleFilter, userFilter)
  }

  return (
    <div className='row form-row'>
      <div className='col-lg-4'>
        <input
          type='text'
          className='form-control'
          id='searchInput'
          value={titleFilter}
          onChange={({ target }) => setTitleFilter(target.value)}
          placeholder='Etsi tapahtuman nimellä'
        />
      </div>

      <div className='col-lg-4'>
        <UserDropdown users={users} filter={userFilter} handleSelect={setUserFilter} />
      </div>

      <div className='col-lg-8'>
        <button
          className='btn btn-treekkari search-button'
          type='button'
          onClick={handleSearch}
        >
          Hae
        </button>
      </div>
    </div>
  )
}

const getToday = () => new Date()

const EventList = () => {
  const users = useSelector(state => state.users)
  const events = useSelector(state => state.events)
  const filter = useSelector(state => state.eventListFilter)

  const dispatch = useDispatch()

  // Filters events based on current filter options
  const applyFilters = allEvents => {
    const checkTitleMatch = (title, searchFor) => (
      title.toLowerCase().includes(searchFor.toLowerCase())
    )

    const dateFiltered = filter.upcoming
      ? allEvents.filter(e => isAfter(e.end, getToday()))
      : allEvents.filter(e => isAfter(getToday(), e.end)).reverse()

    if (filter.user) {
      const userFiltered = dateFiltered.filter(e => e.organizer_id === filter.user)

      if (filter.title) {
        return userFiltered.filter(e => checkTitleMatch(e.title, filter.title))
      }

      return userFiltered
    }

    if (filter.title) {
      return dateFiltered.filter(e => checkTitleMatch(e.title, filter.title))
    }

    return dateFiltered
  }

  // Is called when new filter is applied
  const handleFilter = (titleFilter, userFilter) => {
    dispatch(setEventListFilter({
      title: titleFilter,
      user: userFilter
    }))
  }

  const handleUpcoming = value => {
    dispatch(setEventListUpcoming(value))
  }

  const resetFilter = () => {
    dispatch(resetEventListFilter())
  }

  const showedEvents = filter
    ? applyFilters(events)
    : events

  return (
    <div className='event-list'>
      <div className='collapsible-wrapper'>
        <a
          className='btn btn-light collapsible-menu-button'
          data-toggle='collapse'
          href='#eventSearchCollapsible'
          aria-expanded='false'
          aria-controls='eventSearchCollapsible'
        >
          <SearchIcon />
        </a>
        <div
          className='collapse collapsible'
          id='eventSearchCollapsible'
        >
          <EventSearchBar users={users} filter={filter} setFilter={handleFilter} />
        </div>
      </div>

      <hr />

      <h4>
        Tapahtumat:
      </h4>

      <div className='btn-group btn-group-toggle button-group' data-toggle='buttons'>
        <span
          className={
            filter.upcoming
              ? 'btn btn-treekkari active'
              : 'btn btn-treekkari'
          }
          role='button'
          onClick={() => handleUpcoming(true)}
          tabIndex={0}
          onKeyPress={() => handleUpcoming(true)}
        >
          <input type='radio' name='options' id='option1' autoComplete='off' />
          Tulevat
        </span>

        <span
          className={
            filter.upcoming
              ? 'btn btn-treekkari'
              : 'btn btn-treekkari active'
          }
          role='button'
          onClick={() => handleUpcoming(false)}
          tabIndex={0}
          onKeyPress={() => handleUpcoming(false)}
        >
          <input type='radio' name='options' id='option2' autoComplete='off' />
          Menneet
        </span>
      </div>

      {
        filter.title || filter.user
          ? (
            <div>
              <button
                className='btn btn-treekkari unfilter-button'
                type='button'
                onClick={resetFilter}
              >
                Suodatin
                <UnfilterIcon />
              </button>
            </div>
          )
          : null
      }

      <div className='event-list-events'>
        {
          showedEvents.length !== 0
            ? showedEvents.map(e => <EventListItem key={e.id} e={e} />)
            : 'Tapahtumia ei löytynyt :('
        }
      </div>
    </div>
  )
}

export default EventList

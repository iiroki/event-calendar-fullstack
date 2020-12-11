import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  setSearch,
  resetSearch
} from '../reducers/searchReducer'
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
    <div className='user-dropdown'>
      <button className='btn dropdown-toggle btn-treekkari user-filter' type='button' id='dropdownMenuButton' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
        {
          current // eslint-disable-line
            ? user
              ? user.name
              : 'Tuntematon järjestäjä'
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
    <div>
      <input
        type='text'
        className='form-control'
        id='searchInput'
        value={titleFilter}
        onChange={({ target }) => setTitleFilter(target.value)}
        placeholder='Etsi tapahtuman nimellä'
      />

      <UserDropdown users={users} filter={userFilter} handleSelect={setUserFilter} />

      <button
        className='btn btn-treekkari'
        type='button'
        onClick={handleSearch}
      >
        Hae
      </button>
    </div>
  )
}

const EventList = () => {
  const users = useSelector(state => state.users)
  const events = useSelector(state => state.events)
  const filter = useSelector(state => state.search)

  const dispatch = useDispatch()

  const search = filter.title || filter.user

  // Filters events based on current filter options
  const applyFilters = allEvents => {
    const checkTitleMatch = (title, searchFor) => (
      title.toLowerCase().includes(searchFor.toLowerCase())
    )

    if (filter.user) {
      const userFiltered = allEvents.filter(e => e.organizer_id === filter.user)

      if (filter.title) {
        return userFiltered.filter(e => checkTitleMatch(e.title, filter.title))
      }

      return userFiltered
    }

    if (filter.title) {
      return allEvents.filter(e => checkTitleMatch(e.title, filter.title))
    }

    return allEvents
  }

  // Is called when new filter is applied
  const handleFilter = (titleFilter, userFilter) => {
    dispatch(setSearch({
      title: titleFilter,
      user: userFilter
    }))
  }

  const resetFilter = () => {
    dispatch(resetSearch())
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
          className={
            search
              ? 'collapse collapsible show'
              : 'collapse collapsible'
          }
          id='eventSearchCollapsible'
        >
          <EventSearchBar users={users} filter={filter} setFilter={handleFilter} />
        </div>
      </div>

      <hr />

      <h4>
        Tapahtumat:
      </h4>

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

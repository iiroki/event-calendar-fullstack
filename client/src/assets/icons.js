import React from 'react'

export const Icon = () => (
  <img src='/pseura_logo.svg' width='30' height='30' className='d-inline-block align-top navbar-icon' alt='Tapahtumakalenteri' />
)

// All icons below are from tablericons.com!

export const CalendarIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-calendar-event navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#FFFFFF' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <rect x='4' y='5' width='16' height='16' rx='2' />
    <line x1='16' y1='3' x2='16' y2='7' />
    <line x1='8' y1='3' x2='8' y2='7' />
    <line x1='4' y1='11' x2='20' y2='11' />
    <rect x='8' y='15' width='2' height='2' />
  </svg>
)

export const AboutIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-bulb navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#ffffff' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M3 12h1M12 3v1M20 12h1M5.6 5.6l.7 .7M18.4 5.6l-.7 .7' />
    <path d='M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3' />
    <line x1='9.7' y1='17' x2='14.3' y2='17' />
  </svg>
)

export const CompassIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-compass navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#FFFFFF' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <polyline points='8 16 10 10 16 8 14 14 8 16' />
    <circle cx='12' cy='12' r='9' />
  </svg>
)

export const ManageIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-tools navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#FFFFFF' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M3 21h4l13 -13a1.5 1.5 0 0 0 -4 -4l-13 13v4' />
    <line x1='14.5' y1='5.5' x2='18.5' y2='9.5' />
    <polyline points='12 8 7 3 3 7 8 12' />
    <line x1='7' y1='8' x2='5.5' y2='9.5' />
    <polyline points='16 12 21 17 17 21 12 16' />
    <line x1='16' y1='17' x2='14.5' y2='18.5' />
  </svg>
)

export const NextIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-chevron-right navbar-icon' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <polyline points='9 6 15 12 9 18' />
  </svg>
)

export const PrevIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-chevron-left navbar-icon' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <polyline points='15 6 9 12 15 18' />
  </svg>
)

export const HelpIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-help navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <circle cx='12' cy='12' r='9' />
    <line x1='12' y1='17' x2='12' y2='17.01' />
    <path d='M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4' />
  </svg>
)

export const AlertIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-alert-circle navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <circle cx='12' cy='12' r='9' />
    <line x1='12' y1='8' x2='12' y2='12' />
    <line x1='12' y1='16' x2='12.01' y2='16' />
  </svg>
)

export const ThumbUpIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-thumb-up navbar-icon' width='32' height='32' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#4CAF50' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M7 11v 8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3' />
  </svg>
)

export const ThumbDownIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-thumb-down navbar-icon' width='32' height='32' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#F44336' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v 1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3' />
  </svg>
)

export const EditIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-edit navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' />
    <path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' />
    <line x1='16' y1='5' x2='19' y2='8' />
  </svg>
)

export const DeleteIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-trash navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <line x1='4' y1='7' x2='20' y2='7' />
    <line x1='10' y1='11' x2='10' y2='17' />
    <line x1='14' y1='11' x2='14' y2='17' />
    <path d='M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12' />
    <path d='M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3' />
  </svg>
)

export const CopyrightIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-copyright navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <circle cx='12' cy='12' r='9' />
    <path d='M14.5 9a3.5 4 0 1 0 0 6' />
  </svg>
)

export const GitHubIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-brand-github navbar-icon' width='20' height='20' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
    <path stroke='none' d='M0 0h24v24H0z' />
    <path d='M9 19c-4.286 1.35-4.286-2.55-6-3m12 5v-3.5c0-1 .099-1.405-.5-2 2.791-.3 5.5-1.366 5.5-6.04a4.567 4.567 0 0 0 -1.333 -3.21 4.192 4.192 0 00-.08-3.227s-1.05-.3-3.476 1.267a12.334 12.334 0 0 0 -6.222 0C6.462 2.723 5.413 3.023 5.413 3.023a4.192 4.192 0 0 0 -.08 3.227A4.566 4.566 0 004 9.486c0 4.64 2.709 5.68 5.5 6.014-.591.589-.56 1.183-.5 2V21' />
  </svg>
)

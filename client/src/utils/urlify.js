// eslint-disable-next-line
const urlExp = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
const urlRegex = new RegExp(urlExp)

const urlify = text => (
  text.replace(urlRegex, url => (
    `<a href="${url}"> url </a>`
  ))
)

export default urlify

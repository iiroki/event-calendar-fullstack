const bcrypt = require('bcrypt')

if (process.argv.length !== 3) {
  console.log('No pw provided!')
  return
}

const saltRounds = 10
const pw = process.argv[2]

bcrypt.hash(pw, saltRounds, (error, pwHash) => {
  console.log('New pw hash:')
  console.log(pwHash)
})
// For logging requests during development
const requestLogger = (request, response, next) => {
  console.log(`Request method: ${request.method}`)
  console.log(`Path: ${request.path}`)
  console.log(`Body: ${JSON.stringify(request.body)}`)
  console.log('- - - - -')
  next()
}

// Extracts token from a request
const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')

  // Authorization has to start with BEARER
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.substring(7)
  } else {
    request.token = null
  }

  next()
}

// Own custom error handler middleware
const errorHandler = (error, request, response, next) => {
  //console.log(error)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: {
        code: 1,
        message: 'Invalid token'
      }
    })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: {
        code: 2,
        message: 'Expired token'
      }
    })
  } else if (error.errno === 1048  // MySQL: Validation failed
    || error.errno === 1062  // MySQL: Duplicate unique value
    || error.errno === 4025  // MySQL: Constraint failed
    || error.errno === 1292  // MySQL: Incorrect datetime value
    || error.errno === 1406) {  // MySQL: Data too long
  return response.status(400).json({
    error: {
      code: 0,
      message: error.sqlMessage
    }
  })
} else if (error.errno === 1146){  // MySQL: Table not found
  return response.status(500).json({
    error: {
      code: -1,
      message: error.sqlMessage
    }
  })
}

  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).json({ 'error': 'Unknown endpoint' })
}

module.exports = {
  requestLogger,
  tokenExtractor,
  errorHandler,
  unknownEndpoint
}

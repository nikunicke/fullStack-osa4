const morgan = require('morgan')
const logger = require('./logger')

morgan.token('data', (req) => {
    if (req.method === 'POST') {
        return JSON.stringify(req.body)
    }
})

const requestLogger = morgan(':method :url :res[content-length] - :response-time ms :data')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if(error.name === 'CastError' && error.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'TypeError') {
        return res.status(500).json({ error: 'Contact was already deleted from server' })
    }
    console.log(error)
    next(error)
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)
    }
    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor
}
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const folderRouter = require('./folders/folders-router')
const noteRouter = require('./notes/notes-router')
const app = express()


var whitelist = ['http://localhost:3000', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
 

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors(corsOptions))

app.use('/api/folders', folderRouter)
app.use('/api/notes', noteRouter)

app.get('/', (req, res) => {
    res.send('Hello')
})


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
         response = { error: { message: 'server error' } }
  } else {
   console.error(error)
     response = { message: error.message, error }
  }
      res.status(500).json(response)
})
    

module.exports = app
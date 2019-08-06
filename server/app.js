const express = require('express')
const path = require('path')
const router = require('./router')
const cookieParser = require('cookie-parser');

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, '../public/dist')))
app.use(router)
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/dist/index.html'), function(
    err
  ) {
    if (err) {
      res.status(500).send(err)
    }
  })
})
module.exports = app

const cookie = require('cookie')
const User = require('../models/users')

exports.addRex = (req, res) => {
  const { filmInfo, receiverHandle, comment } = req.body

  User.findOne({ handle: receiverHandle }, (err, doc) => {
    if (!doc)
      return res.json({
        status: 'fail',
        message: 'no user exists with this handle'
      })
    if (err) console.log('err', err)

    const fromHandle = cookie.parse(req.headers.cookie).user

    const rex = {
      filmInfo,
      fromHandle,
      comment,
      pending: true
    }

    doc.receivedRex.push(rex)
    doc.save()
    res.json({ doc })
  })
}

exports.deleteRex = (req, res) => {
  const { id } = req.params
  const handle = cookie.parse(req.headers.cookie).user

  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)

    const rexArr = doc.receivedRex
    const index = rexArr.findIndex(e => e.id === id)
    rexArr.splice(index, 1)

    doc.save()
    res.json({ doc })
  })
}

exports.changeRexStatus = (req, res) => {
  const { id } = req.params
  const { pendingStatus } = req.body
  const handle = cookie.parse(req.headers.cookie).user
  User.findOne({ handle }, (err, doc) => {
    if (err) console.log('err', err)

    const rexArr = doc.receivedRex
    const index = rexArr.findIndex(e => e.id === id)
    rexArr[index].pending = pendingStatus

    doc.save()
    res.json({ doc })
  })
}

const cookie = require('cookie')

exports.addRex = (req, res) => {
  const reqInfo = req.body.rex
  const handle = req.body.toHandle // in the body have the handle of who you want to send rec to.
  User.findOne({ handle: handle }, (err, doc) => {
    if (err) console.log('err', err)
    doc.receivedRex.push(reqInfo)
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

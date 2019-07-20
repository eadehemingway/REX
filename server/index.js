const mongoose = require('mongoose')
const env = require('dotenv')
const router = require('./router')

env.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DB.replace('<password>', process.env.DB_PASSWORD)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful'))

const port = process.env.PORT || 3000
app.use(router)
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})

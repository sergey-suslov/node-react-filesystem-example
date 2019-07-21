import mongoose from 'mongoose'
import config from 'config'
import './models/User'

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME || config.db.name}`, {
  useNewUrlParser: true,
  dbName: process.env.DB_NAME || config.db.name,
  user: process.env.USER_NAME || config.db.userName,
  pass: process.env.USER_PASSWORD || config.db.userPassword
})

export default mongoose

import mongoose from 'mongoose'
import { generateHash, compareHashes } from '../../util/crypto'

const schema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: false },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  blocked: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
})

schema.statics.registerByEmail = async function(email, password) {
  const { hash, salt } = generateHash(password)
  const user = await this.create({
    email,
    hash,
    salt
  })
  return user
}

schema.statics.getByEmailAndPassword = async function(email, password) {
  const user = await this.findOne({ email })
  const isPasswordValid = compareHashes(password, user.hash, user.salt)
  return isPasswordValid ? user : null
}

const User = mongoose.model('User', schema)
export default User

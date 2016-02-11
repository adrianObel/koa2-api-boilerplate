import mongoose from 'mongoose'

const User = new mongoose.Schema({
  type: { type: String, default: 'User' },
  name: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export default mongoose.model('user', User)

const mongoose = require('mongoose')
const PLM = require('passport-local-mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  store_location: {
    type: String
  },
  role: {
    type: String,
    enum: ['Manager', 'Admin', 'Sales Representative']
  }
})

userSchema.plugin(PLM)

module.exports = mongoose.model('User', userSchema)

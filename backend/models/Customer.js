const mongoose = require('mongoose')
//const PLM = require('passport-local-mongoose')
const { Schema } = mongoose

const customerSchema = new Schema(
  {
    first_name: String,
    last_name: String,
    email: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    picture_one: { type: Schema.Types.ObjectId, ref: 'Image' },
    picture_two: { type: Schema.Types.ObjectId, ref: 'Image' }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
)

//customerSchema.plugin(PLM)

module.exports = mongoose.model('Customer', customerSchema)

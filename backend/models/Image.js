const mongoose = require('mongoose')
//const PLM = require('passport-local-mongoose')
const { Schema } = mongoose

const imageSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
  image_name: String,
  image_data: String
})

//customerSchema.plugin(PLM)

module.exports = mongoose.model('Image', imageSchema)

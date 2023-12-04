const mongoose = require('mongoose')

const Room = new mongoose.Schema(
  {
    roomId: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: String,
    connect: Array,
    humidity: Array,
    temperature: Array,
    lightIntensity: Array,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('room', Room)

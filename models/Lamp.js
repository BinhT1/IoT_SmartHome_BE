const mongoose = require('mongoose')

const Lamp = new mongoose.Schema(
  {
    lampId: {
      type: String,
      require: true,
      unique: true,
    },
    name: String,
    roomId: String,
    status: Boolean,
    mode: {
      type: String,
      enum: ['manual', 'timer', 'auto'],
      default: 'manual',
    },

    timerMode: [],
    autoMode: [],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('lamp', Lamp)

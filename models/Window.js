const mongoose = require('mongoose');

const Window = new mongoose.Schema(
  {
    windowId: {
      type: String,
      require: true,
      unique: true,
    },
    roomId: String,
    distanceSensorId: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
    },
    status: Number, // khoảng từ 0 -> 1, 0 là mở toàn bộ rèm, 1 là đóng toàn bộ rèm
    height: Number, // chiều cao của rèm cửa, người dùng tự config
    mode: {
      type: String,
      enum: ['manual', 'timer', 'auto'],
      default: 'manual',
    },

    timers: [],
    breakpoints: [],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('window', Window);

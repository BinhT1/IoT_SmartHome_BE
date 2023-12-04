const User = require('../models/User')
const Room = require('../models/Room')
const { isObjectNull } = require('../utils/index')

const roomController = {
  createRoom: async (req, res) => {
    try {
      const { name, roomId } = req.body

      // check variable
      if (name == '' || roomId == '' || isObjectNull(name) || isObjectNull(roomId)) {
        res.status(400).send({
          result: 'fail',
          message: 'thiếu name hoặc roomId',
        })
      }

      // user from auth middleware
      const user = req.user

      // kiểm tra tên và ID của phòng đã tồn tại trong tài khoản này chưa
      const rooms = await Room.find({
        user: user.id,
      })

      for (var i = 0; i < rooms.length; i++) {
        if (rooms[i].name === name || rooms[i].roomId == roomId) {
          return res.status(400).send({
            result: 'fail',
            message: 'name hoặc roomId đã tồn tại',
          })
        }
      }

      const newRoom = new Room({
        user: user.id,
        roomId: roomId,
        name: name,
        connect: [],
        humidity: [],
        temperature: [],
        lightIntensity: [],
      })

      await newRoom.save()

      await newRoom.populate('user')

      return res.json({
        result: 'success',
        room: newRoom,
      })
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },
  getAll: async (req, res) => {
    try {
      const user = req.user
      const rooms = await Room.find({
        user: user.id,
      })

      return res.json({
        result: 'success',
        rooms: rooms,
      })
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },
  detail: async (req, res) => {
    try {
      const room = req.room

      return res.send({
        result: 'success',
        room: room,
      })
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },
  update: async (req, res) => {
    try {
      const { name, roomId } = req.body

      if (name === '' || isObjectNull(name)) {
        return res.status(400).send({
          result: 'fail',
          message: 'Không đủ tham số name',
        })
      }

      const room = await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          name: name,
        },
        {
          new: true,
        },
      )

      return res.send({
        result: 'success',
        room: room,
      })
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },
  delete: async (req, res) => {
    try {
      const roomId = req.body.roomId

      await Room.findOneAndDelete({ roomId: roomId })

      return res.send({
        result: 'success',
      })
    } catch (err) {
      res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },
}

module.exports = roomController

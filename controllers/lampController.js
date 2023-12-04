const Lamp = require('../models/Lamp')
const Room = require('../models/Room')
const Window = require('../models/Window')

const lampController = {
  create: async (req, res) => {
    try {
      const { name, lampOrder, roomId } = req.body

      const room = req.room

      // check lampOrder exist
      const roomConnect = room.connect

      for (var i = 0; i < roomConnect.length; i++) {
        if (roomConnect[i] == lampOrder.toString()) {
          return res.status(400).send({
            result: 'fail',
            message: 'Chân đèn đã tồn tại',
          })
        }
      }

      const newLamp = new Lamp({
        roomId: roomId,
        lampId: roomId + lampOrder.toString(),
        name: name,
        status: false,
        mode: 'manual',
        timerMode: [],
        autoMode: [],
      })

      await newLamp.save()

      await Room.findOneAndUpdate(
        {
          roomId: roomId,
        },
        {
          connect: room.connect.push(lampOrder.toString()),
        },
      )

      res.status(200).json({
        result: 'success',
        plant: newLamp,
      })
    } catch (err) {
      return res.status(500).send({
        result: 'fail',
        message: err.message,
      })
    }
  },

  changeName: async (req, res) => {
    const { name, lampId } = req.body

    const lampAfter = await Lamp.findOneAndUpdate(
      {
        lampId: lampId,
      },
      {
        name: name,
      },
    )

    res.status(200).send({
      result: 'success',
      lamp: lampAfter,
    })
  },

  changeMode: async (req, res) => {
    const { lampId, mode } = req.body

    //mqtt send change mode
  },
}

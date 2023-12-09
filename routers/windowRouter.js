const express = require('express');

const router = express.Router();

const windowController = require('../controllers/windowController');
const auth = require('../middleware/authMiddleware');
const room = require('../middleware/roomMiddleware');
const window = require('../middleware/windowMiddleware');

//create
router.post('/api/v1/window/create', auth, room, windowController.create);

//change name height
router.post('/api/v1/window/change-name-height', auth, window, windowController.changeNameHeight);

//change mode
router.post('/api/v1/window/change-mode', auth, window, windowController.changeMode);

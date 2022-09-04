const express = require('express');
const controller = require('../controller/userController')

const router = express.Router()

router.get('/random', controller.getRandomUser)
router.get('/all', controller.getAllUsers)
router.post('/save', controller.saveUser)
router.patch('/update/:id', controller.updateUsers)
router.patch('/bulk-update', controller.bulkUpdate)

module.exports = router
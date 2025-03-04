const express = require("express")
const router = express.Router()

const sachController = require('../../controllers/sach.controller')

router
    .get('/', sachController.getAll)
    .post('/add', sachController.add)
    .patch('/update', sachController.update)
    .delete('/delete/:MaSach', sachController.delete)
    .delete('/delete', sachController.deleteAll)

module.exports = router;
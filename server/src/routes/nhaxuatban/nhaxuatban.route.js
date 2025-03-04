const express = require("express")
const router = express.Router()

const nhaXuatBanController = require("../../controllers/nhaxuatban.controller")


router
    .get('/', nhaXuatBanController.getAll)
    .post('/add', nhaXuatBanController.add)
    .patch('/update/:MaNXB', nhaXuatBanController.update)
    .delete('/delete/:MaNXB', nhaXuatBanController.delete)
    .delete('/deleteAll', nhaXuatBanController.deleteAll)

module.exports = router;
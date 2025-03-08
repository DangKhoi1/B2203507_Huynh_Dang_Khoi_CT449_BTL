const express = require("express")
const router = express.Router()

const muonSachController = require("../../controllers/muonsach.controller")

router
    .get('/', muonSachController.getAllForUser)
    .get('/admin', muonSachController.getAllForAdmin)
    .post('/add', muonSachController.addBorrow) //user
    .patch('/admin/update', muonSachController.updateBorrowForAdmin)
    .delete('/user/delete/:muonId', muonSachController.deleteBorrowForUser)
    .delete('/admin/delete/:muonId', muonSachController.deleteBorrowForAdmin)
module.exports = router
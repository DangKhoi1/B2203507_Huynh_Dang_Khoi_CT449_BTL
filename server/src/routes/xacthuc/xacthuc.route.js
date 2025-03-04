const express = require("express")
const router = express.Router()
const XacThucController = require("../../controllers/xacthuc.controller")

router.post("/dangnhap", XacThucController.dangNhap)
    .post("/dangky", XacThucController.dangKy)
    .post("/nhanviendangky", XacThucController.nhanVienDangKy)
    .post("/nhanviendangnhap", XacThucController.nhanVienDangNhap)
    .post("/dangxuat", XacThucController.dangXuat)
module.exports = router;

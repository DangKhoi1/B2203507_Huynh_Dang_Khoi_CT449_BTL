const mongoose = require("mongoose");

const bangNguoiDung = new mongoose.Schema(
    {
        HoLot: { type: String, required: true },
        Ten: { type: String, required: true },
        NgaySinh: { type: Date, required: true, default: Date.now() },
        GioiTinh: { type: String, required: true },
        DiaChi: { type: String, required: true },
        SoDienThoai: { type: String, required: true },
        MatKhau: { type: String, required: true },
        //them vao thuoc tinh MatKhau
    },
    { collection: 'NguoiDung' }
);

module.exports = mongoose.model?.bangNguoiDung || mongoose.model("bangNguoiDung", bangNguoiDung);

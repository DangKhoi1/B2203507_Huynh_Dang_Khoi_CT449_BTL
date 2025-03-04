const mongoose = require("mongoose");
const tuDongTangLen = require("mongoose-sequence")(mongoose);

const bangSach = new mongoose.Schema(
    {
        MaSach: Number,
        TenSach: { type: String, required: true },
        DonGia: { type: String, required: true },
        SoQuyen: { type: Number, required: true },
        NamXuatBan: { type: Number, required: true },
        TacGia: { type: String },
        MaNXB: { type: mongoose.Schema.Types.ObjectId, ref: "bangNhaXuatBan", required: true },
        image: { type: String },
        SoLuongDaMuon: { type: Number, required: true, default: 0 },
        //them thuoc tinh SoLuongDaMuon
    },
    { timestamps: true, minimize: false, collection: 'Sach' }
);

bangSach.plugin(tuDongTangLen, { inc_field: "MaSach", start_seq: 1000 });

module.exports = mongoose.models?.bangSach || mongoose.model('bangSach', bangSach);
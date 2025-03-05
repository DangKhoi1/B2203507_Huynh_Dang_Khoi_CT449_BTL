const mongoose = require('mongoose');
const tuDongTangLen = require('mongoose-sequence')(mongoose);

const bangMuonSach = mongoose.Schema(
    {
        MaMuonSach: Number,
        MaDocGia: { type: mongoose.Schema.ObjectId, ref: 'bangNguoiDung', require: true },
        MaSach: { type: mongoose.Schema.ObjectId, ref: 'bangSach', require: true },
        MaNhanVien: { type: mongoose.Schema.ObjectId, ref: 'bangNhanVien' },
        NgayMuon: { type: Date },
        NgayTra: { type: Date },
        SoLuongMuon: { type: Number, required: true, default: 1 },
        TrangThai: { type: String, required: true, default: 'chưa giải quyết' },
        //pending / borrow / paid
    },
    { timestamps: true, minimize: false, collection: 'MuonSach' },
)

bangMuonSach.plugin(tuDongTangLen, { inc_field: "MaMuonSach", start_seq: 1000 });

module.exports = mongoose.models?.bangMuonSach || mongoose.model('bangMuonSach', bangMuonSach);
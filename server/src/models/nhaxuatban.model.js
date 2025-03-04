const mongoose = require("mongoose");
const tuDongTangLen = require("mongoose-sequence")(mongoose);

const bangNhaXuatBan = new mongoose.Schema(
    {
        MaNXB: Number,
        TenNXB: { type: String, require: true },
        DiaChi: { type: String, require: true },
    },
    {
        timestamps: true,
        minimize: false,
        collection: 'NhaXuatBan'
    }
);

bangNhaXuatBan.plugin(tuDongTangLen, { inc_field: "MaNXB", start_seq: 1000 });

module.exports = mongoose.model("bangNhaXuatBan", bangNhaXuatBan);

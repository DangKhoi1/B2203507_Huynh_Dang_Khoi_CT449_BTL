const duongXacThuc = require("./xacthuc/xacthuc.route")
const duongSach = require("./sach/sach.route")
const duongMuonSach = require("./muonsach/muonsach.route")
const nhaXuatBan = require("./nhaxuatban/nhaxuatban.route")

module.exports = (app) => {
    app.use('/xacthuc', duongXacThuc);
    app.use('/sach', duongSach);
    app.use('/muonsach', duongMuonSach);
    app.use('/nhaxuatban', nhaXuatBan);
}
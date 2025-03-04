const nguoidungModel = require("../models/nguoidung.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = class nguoiDungService {
    async dangKy(dulieu) {
        const kiemThuNguoiDung = await nguoidungModel.exists({ SoDienThoai: dulieu.SoDienThoai });
        if (!kiemThuNguoiDung) {
            const nguoiDungMoi = new nguoidungModel({
                HoLot: dulieu.HoLot,
                Ten: dulieu.Ten,
                NgaySinh: dulieu.NgaySinh,
                SoDienThoai: dulieu.SoDienThoai,
                GioiTinh: dulieu.GioiTinh,
                DiaChi: dulieu.DiaChi,
                MatKhau: bcrypt.hashSync(dulieu.MatKhau, 10), //salt rounds: 10
            });

            try {
                await nguoiDungMoi.save();
                return { message: "Đăng ký thành công! Hãy đăng nhập vào tài khoản của bạn" };
            } catch (error) {
                return { message: error };
            }
        } else {
            return { message: 'Số điện thoại đã tồn tại !' };
        }
    }

    async dangNhap(nguoidung) {

        if (!nguoidung || !nguoidung.SoDienThoai || !nguoidung.MatKhau) {
            return { message: "Thông tin đăng nhập không hợp lệ !" }
        }

        try {

            const kiemTraNguoiDung = await nguoidungModel.findOne({ SoDienThoai: nguoidung.SoDienThoai })

            if (!kiemTraNguoiDung) {
                return { message: "Tài khoản không tồn tại !" }
            }

            const matKhauHopLe = await bcrypt.compare(nguoidung.MatKhau, kiemTraNguoiDung.MatKhau)

            if (!matKhauHopLe) {
                return { message: "Mật khẩu không chính xác !" }
            }

            const { MatKhau, ...thongTinNguoiDung } = kiemTraNguoiDung._doc

            //jwt.sign(payload, secretOrPrivateKey, [options])
            const token = jwt.sign(thongTinNguoiDung, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', { expiresIn: '1h' })

            return {
                dulieu: { nguoidung: thongTinNguoiDung, token },
                message: "Đăng nhập thành công !"
            }

        } catch (error) {
            return { message: "Có lỗi xảy ra trong quá trình đăng nhập" }
        }
    }
};

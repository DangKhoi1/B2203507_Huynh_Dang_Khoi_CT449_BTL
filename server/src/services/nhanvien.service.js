const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nhanVienModel = require('../models/nhanvien.model')
module.exports = class nhanVienService {

    async dangKy(dulieu) {
        const kiemThuNhanVien = await nhanVienModel.exists({ SoDienThoai: dulieu.SoDienThoai });

        if (!kiemThuNhanVien) {

            const nhanVienMoi = new nhanVienModel({
                HoTenNV: dulieu.HoTenNV,
                ChucVu: dulieu.ChucVu,
                DiaChi: dulieu.DiaChi,
                SoDienThoai: dulieu.SoDienThoai,
                MatKhau: bcrypt.hashSync(dulieu.MatKhau, 10),
            })

            try {
                await nhanVienMoi.save()
                return { message: 'Đăng ký tài khoản Nhân viên thành công ! Hãy đăng nhập vào tài khoản của bạn !' }
            } catch (error) {
                return { message: error }
            }
        } else {
            return { message: 'Tài khoản đã tồn tại !' }
        }
    }

    async dangNhap(nhanvien) {

        if (!nhanvien || !nhanvien.MatKhau || !nhanvien.SoDienThoai) {
            return { message: "Thông tin đăng nhập không hợp lệ !" }
        }

        try {

            const kiemTraNhanVien = await nhanVienModel.findOne({ SoDienThoai: nhanvien.SoDienThoai })

            if (!kiemTraNhanVien) {
                return { message: "Tài khoản không tồn tại !" }
            }

            const matKhauHopLe = await bcrypt.compare(nhanvien.MatKhau, kiemTraNhanVien.MatKhau)

            if (!matKhauHopLe) {
                return { message: "Mật khẩu không chính xác !" }
            }

            const { MatKhau, ...thongTinNhanVien } = kiemTraNhanVien._doc

            //jwt.sign(payload, secretOrPrivateKey, [options]) B2203507_CT449_HKII_2024-2025
            const token = jwt.sign(thongTinNhanVien, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', { expiresIn: '1h' })

            return {
                dulieu: { nhanvien: thongTinNhanVien, token },
                message: "Đăng nhập thành công !"
            }

        } catch (error) {
            return { message: "Có lỗi xảy ra trong quá trình đăng nhập" }
        }
    }
}
const sachModel = require('../models/sach.model')
const muonSachModel = require('../models/muonsach.model')

module.exports = class muonSachService {
    // for admin
    async getAllForAdmin() {
        const danhSachMuon = await muonSachModel.find({})
            .populate('MaSach')
            .populate('MaNhanVien', ["HoTenNV", "ChucVu", "SoDienThoai"])
            .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
        return {
            muon: danhSachMuon,
            message: "Lấy thông tin mượn sách thành công!"
        }
    }

    async deleteBorrowForAdmin(muonId) {
        const muon = await muonSachModel.findOneAndDelete({ _id: muonId })
        if (muon) {
            if (muon.TrangThai != 'trả') {
                const sach = await sachModel.findById(sach.MaSach)
                await sachModel.findByIdAndUpdate(muon.MaSach, { $set: { SoLuongDaMuon: sach.SoLuongDaMuon - muon.SoLuongMuon } })
            }
        }
        return {
            muon: muon,
            message: "Xóa mượn sách thành công!"
        }
    }

    async updateBorrowForAdmin(nhanVienId, capNhatDuLieu) {
        if (capNhatDuLieu.TrangThai == 'mượn') {
            const muon = await muonSachModel.findOneAndUpdate(
                { _id: capNhatDuLieu._id },
                {
                    TrangThai: capNhatDuLieu.TrangThai,
                    NgayMuon: Date.now(),
                    MaNhanVien: nhanVienId
                },
                { new: true }
            )

            const chiTietMuon = await muonmSachModel.findOne(({ _id: capNhatDuLieu._id }))
                .populate('MaSach')
                .populate('MaNhanVien', ["HoTenNV", "ChucVu", "SoDienThoai"])
                .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
            return {
                muon: chiTietMuon,
                message: "Cập nhật thành công!"
            }
        }

        else if (capNhatDuLieu.TrangThai == 'trả') {
            const muon = await muonSachModel.findOne({ _id: capNhatDuLieu._id })
            const sach = await sachModel.findOne({ _id: muon.MaSach }) //ma sach o day la ID
            const traVeNgay = Date.now()
            muon.TrangThai = capNhatDuLieu.TrangThai
            muon.MaNhanVien = nhanVienId
            muon.NgayTra = traVeNgay
            await muon.save()
            await sachModel.findByIdAndUpdate(muon.MaSach, { $set: { SoLuongDaMuon: sach.SoLuongDaMuon - muon.SoLuongMuon } })
            const luuMuonSach = await muonSachModel.findOne({ _id: capNhatDuLieu._id })
                .populate('MaSach')
                .populate('MaNhanVien', ["HoTenNV", "ChucVu", "SoDienThoai"])
                .populate('MaDocGia', ['HoLot', 'Ten', 'NgaySinh', 'GioiTinh', 'DiaChi', 'SoDienThoai'])
            return {
                muon: luuMuonSach,
                message: "Cập nhật thành công!"
            }
        }
    }

    //for user

    async getAllForUser(nguoiDungId) {
        const danhSachMuon = await muonSachModel.find({ MaDocGia: nguoiDungId }).populate('MaSach')
        return {
            muon: danhSachMuon,
            message: "Lấy dữ liệu mượn sách thành công!"
        }
    }

    async deleteBorrowForUser(muonId) {
        const xoaMuonSach = await muonSachModel.findOneAndDelete({ _id: muonId, TrangThai: 'chưa giải quyết' })
        if (xoaMuonSach) {
            const sach = await sachModel.findById(xoaMuonSach.MaSach)
            await sachModel.findByIdAndUpdate(xoaMuonSach.MaSach, { $set: { SoLuongDaMuon: sach.SoLuongDaMuon - xoaMuonSach.SoLuongMuon } })
            return {
                muon: xoaMuonSach,
                message: "Hủy mượn sách thành công!"
            }
        }
        return {
            message: "Chỉ xóa được khi chưa nhận sách !"
        }
    }

    async addBorrow(dulieu, nguoiDungId) {
        const muonSachMoi = new muonSachModel({
            MaDocGia: nguoiDungId,
            MaSach: dulieu.MaSach,
            SoLuongMuon: dulieu.SoLuongMuon //
        })
        await muonSachMoi.save()
        if (muonSachMoi) {
            //update so luong sach da muon
            const sach = await sachModel.findById(dulieu.MaSach)
            await sachModel.findByIdAndUpdate(dulieu.MaSach, { $set: { SoLuongDaMuon: sach.SoLuongDaMuon + muonSachMoi.SoLuongMuon } })
            console.log(sach.TenSach)
        }
        return {
            muon: muonSachMoi,
            message: "Mượn sách thành công!"
        }
    }
} 
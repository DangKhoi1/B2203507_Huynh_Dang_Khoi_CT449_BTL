const sachModel = require('../models/sach.model')

module.exports = class sachService {
    async getAll() {
        const sach = await sachModel.find().populate('MaNXB')
        return {
            sach: sach,
            message: 'Lấy sách thành công!'
        }
    }

    async add(dulieu) {
        const hople = await sachModel.findOne({
            $or: [{ TenSach: dulieu.TenSach }, { MaSach: dulieu.MaSach }]
        })

        if (!hople) {

            const sachMoi = new sachModel(dulieu)
            const sachDaLuu = await sachMoi.save()
            const sachTraVe = await sachDaLuu.populate('MaNXB')
            return {
                sach: sachTraVe,
                message: 'Thêm sách thành công!'
            }
        }
        return {
            message: "Sách đã tồn tại !",
        }
    }

    async update(dulieu) {
        const capNhatSach = await sachModel.findOneAndUpdate(
            { _id: dulieu._id },
            {
                $set: {
                    TenSach: dulieu.TenSach,
                    DonGia: dulieu.DonGia,
                    SoQuyen: dulieu.SoQuyen,
                    NamXuatBan: dulieu.NamXuatBan,
                    TacGia: dulieu.TacGia,
                    MaNXB: dulieu.MaNXB,
                    image: dulieu.image
                }
            },
            { new: true }
        )
        if (!capNhatSach) {
            return {
                message: 'Không tìm thấy sách !'
            }
        }
        await capNhatSach.populate('MaNXB')
        return {
            sach: capNhatSach,
            message: 'Cập nhật sách thành công!'
        }
    }

    async delete(maSach) {
        const xoaSach = await sachModel.findOneAndDelete({ MaSach: maSach })
        return xoaSach;
    }

    async deleteAll() {
        const ketqua = await sachModel.deleteMany({})
        return ketqua.deletedCount;
    }
}
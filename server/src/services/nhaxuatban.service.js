const nhaXuatBanModel = require('../models/nhaxuatban.model')

module.exports = class nhaXuatBanService {

    async add(dulieu) {

        const nhaXuatBanMoi = new nhaXuatBanModel(dulieu)
        // const isValid = await publisherModel.exists({TenNXB : data.TenNXB})
        // const isMaNXBDuplicated = await publisherModel.exists({ MaNXB: data.MaNXB });

        // if(isMaNXBDuplicated){
        //     return { 
        //         message: "Mã nhà xuất bản không được trùng lặp!",
        //     }
        // }

        // if(isValid) {
        //     return {
        //         message: "Nhà xuất bản đã tồn tại !",
        //     }
        // }
        const ketqua = await nhaXuatBanMoi.save()
        return {
            nhaxuatban: nhaXuatBanMoi,
            message: 'Thêm nhà xuất bản thành công!'
        }
    } s


    async find(dieukien) {
        const nhaXuatBan = await nhaXuatBanModel.find(dieukien);
        return {
            nhaXuatBan: nhaXuatBan,
            message: 'Lấy nhà xuất bản thành công!'
        }
    }

    async findByName(ten) {
        const nhaXuatBan = await this.find({ TenNXB: { $regex: new RegExp(new RegExp(ten)), $options: "i" } })
        return {
            nhaXuatBan: nhaXuatBan,
            message: 'Lấy nhà xuất bản thành công!'
        }
    }

    async update(dulieu) {
        const capNhatNhaXuatBan = await nhaXuatBanModel.findOneAndUpdate(
            { MaNXB: dulieu.MaNXB },
            { $set: { TenNXB: dulieu.TenNXB, DiaChi: dulieu.DiaChi } },
            { returnDocument: "after" }
        )
        return {
            nhaXuatBan: capNhatNhaXuatBan,
            message: "Cập nhật nhà xuất bản thành công"
        }
    }

    async deleteAll() {
        const ketqua = await nhaXuatBanModelModel.deleteMany({})
        return ketqua.deletedCount
    }

    async delete(maNhaXuatBan) {
        const nhaXuatBanDaXoa = await nhaXuatBanModel.findOneAndDelete({ MaNXB: maNhaXuatBan })
        return {
            nhaXuatBan: nhaXuatBanDaXoa,
            message: 'Xoắ nhà xuất bản thành công'
        }
    }
}
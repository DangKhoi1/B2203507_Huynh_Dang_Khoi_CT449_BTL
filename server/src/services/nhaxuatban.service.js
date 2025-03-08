const nhaXuatBanModel = require('../models/nhaxuatban.model')

module.exports = class nhaXuatBanService {

    async add(dulieu) {

        const nhaXuatBanMoi = new nhaXuatBanModel(dulieu)
        const ketqua = await nhaXuatBanMoi.save()
        return {
            nhaXuatBanMoi: nhaXuatBanMoi,
            message: 'Thêm nhà xuất bản thành công!'
        }
    }


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
        try {
            // Ép kiểu MaNXB về Number
            const MaNXB = Number(dulieu.MaNXB);
            if (isNaN(MaNXB)) {
                return {
                    nhaXuatBan: null,
                    message: "MaNXB không hợp lệ"
                };
            }

            // Cập nhật dữ liệu trong MongoDB
            const capNhatNhaXuatBan = await nhaXuatBanModel.findOneAndUpdate(
                { MaNXB: MaNXB }, // Tìm theo MaNXB kiểu Number
                { $set: { TenNXB: dulieu.TenNXB, DiaChi: dulieu.DiaChi } },
                { new: true } // Dùng `new: true` để trả về dữ liệu sau khi cập nhật
            );

            if (!capNhatNhaXuatBan) {
                return {
                    nhaXuatBan: null,
                    message: "Không tìm thấy nhà xuất bản để cập nhật"
                };
            }

            return {
                nhaXuatBan: capNhatNhaXuatBan,
                message: "Cập nhật nhà xuất bản thành công"
            };
        } catch (error) {
            return {
                nhaXuatBan: null,
                message: "Lỗi",
                error: error.message
            };
        }
    }



    async deleteAll() {
        const ketqua = await nhaXuatBanModel.deleteMany({})
        return ketqua.deletedCount
    }

    async delete(maNhaXuatBan) {
        try {
            // Ép kiểu sang Number
            const MaNXB = Number(maNhaXuatBan);

            if (isNaN(MaNXB)) {
                return { message: "MaNXB không hợp lệ" };
            }

            const nhaXuatBanDaXoa = await nhaXuatBanModel.findOneAndDelete({ MaNXB });

            if (!nhaXuatBanDaXoa) {
                return { message: "Không tìm thấy nhà xuất bản để xóa" };
            }

            return {
                nhaXuatBan: nhaXuatBanDaXoa,
                message: "Xóa nhà xuất bản thành công"
            };
        } catch (error) {
            return {
                message: "Lỗi",
                error: error.message
            };
        }
    }

}
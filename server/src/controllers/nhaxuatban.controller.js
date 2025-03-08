const nhaXuatBanService = require('../services/nhaxuatban.service');
const jwt = require('jsonwebtoken');
const ApiError = require('../api-error');

function verifyToken(req, res) {
    const token = req.headers['authorization']?.split(" ")[1]; // Lấy token từ header chuẩn
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', (error, user) => {
            if (error || !user.ChucVu) {
                return reject('Trái phép!');
            } else {
                resolve(user);
            }
        });
    });
}

// [POST] [nhaxuatban/add]
module.exports.add = async (req, res, next) => {
    if (!req.body?.TenNXB) {
        return next(new ApiError(400, "Tên nhà xuất bản không được để trống!"));
    }
    try {
        await verifyToken(req, res);
        const nhaxuatban = new nhaXuatBanService();
        const ketqua = await nhaxuatban.add(req.body);
        res.json(ketqua);
    } catch (error) {
        console.log(error);
        if (error === 'Trái phép!') {
            return next(new ApiError(401, error));
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi thêm nhà xuất bản!"));
    }
};

// [PATCH] /nhaxuatban/capnhat/:MaNXB
module.exports.update = async (req, res, next) => {
    try {
        await verifyToken(req, res);
        const nhaxuatbanService = new nhaXuatBanService(); // Đặt tên biến rõ ràng hơn
        const ketqua = await nhaxuatbanService.update(req.body);

        if (!ketqua.nhaXuatBan) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản!"));
        }

        return res.json(ketqua);
    } catch (error) {
        console.log(error);
        if (error === "Trái phép!") {
            return next(new ApiError(401, error));
        } else {
            return next(new ApiError(500, "Đã xảy ra lỗi trong khi cập nhật!"));
        }
    }
};


// [DELETE] /nhaxuatban/delete/:MaNXB
module.exports.delete = async (req, res, next) => {
    try {
        await verifyToken(req, res);
        const nhaxuatban = new nhaXuatBanService();
        const ketqua = await nhaxuatban.delete(req.params.MaNXB);
        if (!ketqua) {
            return next(new ApiError(404, "Không tìm thấy nhà xuất bản!"));
        }
        return res.json(ketqua);
    } catch (error) {
        console.log(error);
        if (error === 'Trái phép!') {
            return next(new ApiError(401, error));
        } else {
            return next(new ApiError(500, "Đã xảy ra lỗi trong khi xóa!"));
        }
    }
};

// [GET] /nhaxuatban/
module.exports.getAll = async (req, res, next) => {
    try {
        await verifyToken(req, res);
        const nhaxuatban = new nhaXuatBanService();
        const { TenNXB } = req.query;
        const ketqua = TenNXB ? await nhaxuatban.findByName(TenNXB) : await nhaxuatban.find({});
        res.json(ketqua);
    } catch (error) {
        console.log(error);
        if (error === 'Trái phép!') {
            return next(new ApiError(401, error));
        } else {
            return next(new ApiError(500, "Đã xảy ra lỗi trong khi getAll!"));
        }
    }
};

// [DELETE] nhaxuatban/deleteAll
module.exports.deleteAll = async (req, res, next) => {
    try {
        await verifyToken(req, res);
        const nhaxuatban = new nhaXuatBanService();
        const deleteCount = await nhaxuatban.deleteAll();
        res.json({
            message: `${deleteCount} Nhà xuất bản được xóa thành công!`
        });
    } catch (error) {
        console.log(error);
        if (error === 'Trái phép!') {
            return next(new ApiError(401, error));
        } else {
            return next(new ApiError(500, "Đã xảy ra lỗi trong khi deleteAll!"));
        }
    }
};

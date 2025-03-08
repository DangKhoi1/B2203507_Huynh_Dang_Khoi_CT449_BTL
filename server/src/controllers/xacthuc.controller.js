const ApiError = require('../api-error')
const nguoiDungService = require('../services/nguoidung.service')
const nhanVienService = require('../services/nhanvien.service')

//POST [xacthuc/dangky]
module.exports.dangKy = async (req, res, next) => {
    try {
        const dulieu = req.body
        const nguoidung = new nguoiDungService()
        const ketQuaDangKy = await nguoidung.dangKy(dulieu)
        res.status(200).json({
            status: 200,
            message: ketQuaDangKy.message
        })
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có một lỗi xảy ra trong khi đăng ký!"));
    }
}

//POST [xacthuc/dangnhap]
module.exports.dangNhap = async (req, res, next) => {
    try {
        const dulieu = req.body
        const nguoidung = new nguoiDungService()
        const ketQuaDangNhap = await nguoidung.dangNhap(dulieu)
        res.status(200).json(ketQuaDangNhap);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có một lỗi xảy ra trong khi đăng nhập!"));
    }
}

//POST [xacthuc/nhanviendangnhap]
module.exports.nhanVienDangNhap = async (req, res, next) => {
    try {
        const dulieu = req.body
        const nhanvien = new nhanVienService()
        const ketQuaDangNhap = await nhanvien.dangNhap(dulieu)
        res.status(200).json(ketQuaDangNhap);
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có một lỗi xảy ra trong khi đăng nhập!"));
    }
}

//POST [xacthuc/nhanviendangky]
module.exports.nhanVienDangKy = async (req, res, next) => {
    try {
        const dulieu = req.body
        const nhanvien = new nhanVienService()
        const ketQuaDangKy = await nhanvien.dangKy(dulieu)
        res.status(200).json(ketQuaDangKy)
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Có một lỗi xảy ra trong khi đăng ký!"));
    }
}


module.exports.dangXuat = async (req, res, next) => {
    try {
        localStorage.removeItem('token')
        res.status(200).json({
            message: "Đăng xuất thành công!"
        });
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, "Có một lỗi xảy ra trong khi đăng xuất"));
    }
};
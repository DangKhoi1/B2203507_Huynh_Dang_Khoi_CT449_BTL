const muonSachService = require('../services/muonsach.service')
const jwt = require('jsonwebtoken')
const ApiError = require('../api-error')

// Hàm xác thực token cho người dùng thường
function verifyTokenForUser(req, res) {
    const token = req.headers['authorization']
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', (error, nguoiDung) => {
            if (error) {  //Khong quan tam den nguoiDung.ChucVu
                return reject('Trái phép !')
            }
            else {
                resolve(nguoiDung)
            }
        })
    })
}

// Hàm xác thực token cho admin (yêu cầu thêm điều kiện ChucVu)
function verifyTokenForAdmin(req, res) {
    const token = req.headers['authorization']
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', (error, nguoiDung) => {
            if (error || !nguoiDung.ChucVu) {
                return reject('Trái phép !')
            }
            else {
                resolve(nguoiDung)
            }
        })
    })
}

//nguoiDung
// API lấy tất cả thông tin mượn sách cho người dùng
module.exports.getAllForUser = async (req, res, next) => {
    try {
        const nguoiDung = await verifyTokenForUser(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.getAllForUser(nguoiDung._id)
        res.json(ketqua)
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi getAllForUser !"))
    }
}
// API thêm yêu cầu mượn sách cho người dùng
module.exports.addBorrow = async (req, res, next) => {
    try {
        const nguoiDung = await verifyTokenForUser(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.addBorrow(req.body, nguoiDung._id)
        if (ketqua) {
            res.json(ketqua)
        }
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi getAllForUser !"))
    }
}
// API xóa yêu cầu mượn sách cho người dùng
module.exports.deleteBorrowForUser = async (req, res, next) => {
    try {
        const muonId = req.params.muonId
        const nguoiDung = await verifyTokenForUser(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.deleteBorrowForUser(muonId)
        if (ketqua) {
            res.json(ketqua)
        }
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi deleteBorrowForUser !"))
    }
}

//Admin
// API xóa yêu cầu mượn sách cho admin
module.exports.deleteBorrowForAdmin = async (req, res, next) => {
    try {
        const muonId = req.params.muonId
        const nguoiDung = await verifyTokenForAdmin(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.deleteBorrowForAdmin(muonId)
        if (ketqua) {
            res.json(ketqua)
        }
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi deleteBorrowForAdmin !"))
    }
}

// API cập nhật yêu cầu mượn sách cho admin
module.exports.updateBorrowForAdmin = async (req, res, next) => {
    try {
        const nguoiDung = await verifyTokenForAdmin(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.updateBorrowForAdmin(nguoiDung._id, req.body)
        if (ketqua) {
            res.json(ketqua)
        }
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi updateBorrowForAdmin !"))
    }
}
// API lấy tất cả thông tin mượn sách cho admin
module.exports.getAllForAdmin = async (req, res, next) => {
    try {
        const nguoiDung = await verifyTokenForAdmin(req, res)
        const muonService = new muonSachService()
        const ketqua = await muonService.getAllForAdmin()
        if (ketqua) {
            res.json(ketqua)
        }
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Có 1 lỗi xảy ra trong khi getAllForAdmin !"))
    }
}
const sachService = require('../services/sach.service')
const jwt = require('jsonwebtoken')
const ApiError = require('../api-error')


function verifyToken(req, res) {
    const token = req.headers['authorization']
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET || 'B2203507_CT449_HKII_2024-2025', (error, user) => {
            if (error || !user.ChucVu) {
                return reject('Trái phép !')
            }
            else {
                resolve(user)
            }
        })
    })
}


// [GET] [/sach]
module.exports.getAll = async (req, res, next) => {
    try {
        const sachservice = new sachService()
        const ketqua = await sachservice.getAll()
        res.json(ketqua)
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, "Đã xảy ra lỗi khi getAll sách !")
        )
    }
}

// [POST] [/sach/add]
module.exports.add = async (req, res, next) => {
    if (!req.body.TenSach) {
        return next(new ApiError(400, "Tên sách không được để trống!"))
    }
    try {
        await verifyToken(req, res)
        const sachservice = new sachService()
        const ketqua = await sachservice.add(req.body)
        res.json(ketqua)
    } catch (error) {
        console.log(error.message)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi thêm sách !"))
    }
}

// [PATCH] [/sach/update/:MaSach]
module.exports.update = async (req, res, next) => {
    try {
        await verifyToken(req, res)
        const sachservice = new sachService()
        const ketqua = await sachservice.update(req.body)
        res.json(ketqua)
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật sách !"))
    }
}

// [DELETE] [/sach/delete/:MaSach]
module.exports.delete = async (req, res, next) => {
    try {
        await verifyToken(req, res)
        const sachservice = new sachService()
        const ketqua = await sachservice.delete(req.params.MaSach)
        if (!ketqua) {
            return next(new ApiError(404, "Không tìm thấy sách!"))
        }
        return res.json({
            ketqua,
            message: "Xóa sách thành công!"
        })
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi cập nhật sách !"))
    }
}

// [DELETE] [sach/delete/]
module.exports.deleteAll = async (req, res, next) => {
    try {
        await verifyToken(req, res)
        const sachservice = new sachService()
        const deletedCount = await sachservice.deleteAll()
        res.json({
            message: `${deletedCount} sách được xóa thành công!`
        })
    } catch (error) {
        console.log(error)
        if (error == 'Trái phép !') {
            return next(new ApiError(401, error))
        }
        return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả sách !"))
    }
}
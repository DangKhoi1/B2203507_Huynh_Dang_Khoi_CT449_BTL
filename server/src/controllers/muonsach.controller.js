const muonSachService = require('../services/muonsach.service')
const jwt = require('jsonwebtoken')
const ApiError = require('../api-error')


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

//for nguoiDung
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
        return next(new ApiError(500, "An error occurred while getAllForUser !"))
    }
}

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
        return next(new ApiError(500, "An error occurred while getAllForUser !"))
    }
}

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
        return next(new ApiError(500, "An error occurred while deleteBorrowForUser !"))
    }
}

//for admin
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
        return next(new ApiError(500, "An error occurred while deleteBorrowForAdmin !"))
    }
}

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
        return next(new ApiError(500, "An error occurred while updateBorrowForAdmin !"))
    }
}

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
        return next(new ApiError(500, "An error occurred while getAllForAdmin !"))
    }
}
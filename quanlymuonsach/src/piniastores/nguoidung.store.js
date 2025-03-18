import { axiosInstance } from '../axios/axiosyeucau'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            token: localStorage.getItem('token') || '',
            ThongTinNguoiDung: {},
            ThongTinNhanVien: {},
            staffToken: localStorage.getItem('staffToken') || ''
        }
    },
    actions: {
        //for nguoidung
        NguoiDungDangKy: async function (data) {
            return await axiosInstance.post('/xacthuc/dangky', data)
                .then((res) => { return res.data.message })
                .catch((error) => {
                    console.log(error)
                    return false
                })
        },
        NguoiDungDangNhap: async function (data) {
            return await axiosInstance.post('/xacthuc/dangnhap', data)
                .then((res) => {
                    this.token = res.data.dulieu?.token
                    localStorage.setItem('token', this.token)
                    this.ThongTinNguoiDung = res.data.dulieu?.user
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return false
                })
        },
        //for nhanvien
        NhanVienDangNhap: async function (data) {
            return await axiosInstance.post('/xacthuc/nhanviendangnhap', data)
                .then((res) => {
                    this.staffToken = res.data.dulieu?.token
                    localStorage.setItem('staffToken', this.staffToken)
                    this.ThongTinNhanVien = res.data.dulieu?.staff
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return false
                })
        },
        //all
        NguoiDungDangXuat: function () {
            this.token = '',
                this.ThongTinNguoiDung = {}
            localStorage.removeItem('token')
        },

        NhanVienDangXuat: function () {
            this.staffToken = ''
            this.ThongTinNhanVien = {}
            localStorage.removeItem('staffToken')
        }
    },
})
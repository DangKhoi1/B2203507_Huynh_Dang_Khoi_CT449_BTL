import { axiosInstance } from "@/axios/axiosyeucau";
import { defineStore } from "pinia";
import { useUserStore } from "./nguoidung.store";

export const useBorrowBookStore = defineStore('muonsach', {
    state: () => {
        return {
            SachMuon: [],
            AdminMuon: [],
            fetchAdmin: false,
            fetching: false,
        }
    },
    actions: {
        getAllForAdmin() {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            if (!token) {
                // console.log("Token không hợp lệ hoặc hết hạn");
                return;
            }
            return axiosInstance.get('/muonsach/admin', { headers: { Authorization: token } })
                .then((res) => {
                    this.AdminMuon = [...this.SachMuon, ...res.data.muon]
                    this.fetching = true
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        getAllForUser() {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.token
            return axiosInstance.get('/muonsach', { headers: { Authorization: token } })
                .then((res) => {
                    this.SachMuon = [...this.SachMuon, ...res.data.muon]
                    this.fetching = true
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        addBorrow(data) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.token
            return axiosInstance.post('/muonsach/add', data, { headers: { Authorization: token } })
                .then((res) => {
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        updateBorrowForAdmin(data) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return axiosInstance.patch('/muonsach/admin/update', data, { headers: { Authorization: token } })
                .then((res) => {
                    this.AdminMuon = this.AdminMuon.map((item) => {
                        if (item._id == data._id) {
                            item = res.data.muon
                        }
                        return item
                    })
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        deleteBorrowForUser(muonId) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.token
            return axiosInstance.delete(`/muonsach/nguoidung/delete/${muonId}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.SachMuon = this.SachMuon.filter((item) => item._id !== muonId)
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },

        deleteBorrowForAdmin(muonId) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return axiosInstance.delete(`/muonsach/admin/delete/${muonId}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.AdminMuon = this.AdminMuon.filter((item) => item._id !== muonId)
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
    }
})
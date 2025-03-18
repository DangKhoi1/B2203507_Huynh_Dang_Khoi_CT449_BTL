import { axiosInstance } from '../axios/axiosyeucau'
import { defineStore } from 'pinia'
import { useUserStore } from './nguoidung.store'

export const usePublisherStore = defineStore('nhaxuatban', {
    state: () => {
        return {
            nhaxuatban: [],
            fetching: false,
        }
    },
    actions: {
        async getAll() {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return await axiosInstance.get('/nhaxuatban', { headers: { Authorization: token } })
                .then((res) => {
                    this.nhaxuatban = [...this.nhaxuatban, ...res.data.nhaXuatBan]
                    this.fetching = true
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        async add(data) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return await axiosInstance.post('/nhaxuatban/add', data, { headers: { Authorization: token } })
                .then((res) => {
                    this.nhaxuatban.push(res.data.nhaxuatban)
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        async update(data) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return await axiosInstance.patch(`nhaxuatban/update/${data.MaNXB}`, data, { headers: { Authorization: token } })
                .then((res) => {
                    this.nhaxuatban.forEach((nxb) => {
                        if (nxb.MaNXB == data.MaNXB) {
                            nxb = data
                        }
                    })
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        },
        async delete(MaNXB) {
            const token = useUserStore().staffToken;
            return await axiosInstance.delete(`nhaxuatban/delete/${MaNXB}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.nhaxuatban = this.nhaxuatban.filter((item) => item.MaNXB != MaNXB);
                    return res.data.message;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                });
        },

    },
    getters: {
        getPublisher(trangThai) {
            return (MaNXB) => trangThai.nhaxuatban.find((item) => item.MaNXB == MaNXB);
        },
    }
})
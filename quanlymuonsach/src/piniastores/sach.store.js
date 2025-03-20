import { axiosInstance } from '../axios/axiosyeucau'
import { defineStore } from 'pinia'
import { useUserStore } from './nguoidung.store'

export const useBookStore = defineStore('sach', {
    state: () => {
        return {
            danhSachSach: [],
            searchText: '',
            fetching: false,

        }
    },
    actions: {
        async getAll() {
            // Chỉ gọi API nếu danh sách sách đang trống
            if (this.danhSachSach.length === 0) {
                return await axiosInstance.get('/sach')
                    .then((res) => {
                        this.danhSachSach = res.data.sach;
                        this.fetching = true;
                        return res.data.message;
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            return "Đã có dữ liệu sách";
        },

        async add(data) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return await axiosInstance.post('/sach/add', data, { headers: { Authorization: token } })
                .then((res) => {
                    this.danhSachSach.push(res.data.sach)
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
            return await axiosInstance.patch('/sach/update', data, { headers: { Authorization: token } })
                .then((res) => {
                    console.log(res.data.danhSachSach)
                    this.danhSachSach = this.danhSachSach.map((item) => {
                        if (item._id == data._id) {
                            console.log("Đã cập nhật!")
                            item = res.data.sach
                        }
                        return item
                    })
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                })
        },

        async delete(maSach) {
            const nguoiDungStore = useUserStore()
            const token = nguoiDungStore.staffToken
            return await axiosInstance.delete(`/sach/delete/${maSach}`, { headers: { Authorization: token } })
                .then((res) => {
                    this.danhSachSach = this.danhSachSach.filter((sach) => sach.MaSach != maSach)
                    return res.data.message
                })
                .catch((error) => {
                    console.log(error)
                    return error
                })
        }
    },

    getters: {
        getBook(state) {
            return (maSach) => state.danhSachSach.find((item) => item.MaSach == maSach);
        },
        getBooks(state) {
            return state.danhSachSach;
        },
        getBooksFromTitle(state) {
            return (tieude) => state.danhSachSach.filter((sach) => sach.TenSach.toLowerCase().includes(tieude.toLowerCase()));
        },
        getFetching(state) {
            return state.fetching;
        },
    }
})
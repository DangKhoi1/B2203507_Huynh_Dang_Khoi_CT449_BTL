import { useUserStore } from "@/piniastores/nguoidung.store";
import { createRouter, createWebHistory } from "vue-router";

//import comnponent
import mauDangNhapNguoiDung from "@/components/mauDangNhapNguoiDung.vue";
import { ElMessage } from "element-plus";
//views
import GiaoDienDangNhapQuanLy from "../../views/GiaoDienDangNhapQuanLy.vue";
import GiaoDienTrangChu from "../../views/GiaoDienTrangChu.vue";
import GiaoDienLichSu from "../../views/GiaoDienLichSu.vue";
import GiaoDienDangNhapNguoiDung from "../../views/GiaoDienDangNhapNguoiDung.vue";
import GiaoDienDangKyNguoiDung from "../../views/GiaoDienDangKyNguoiDung.vue";
import GiaoDienQuanLy from "../../views/GiaoDienQuanLy.vue";
import ChiTietSach from "../../views/ChiTietSach.vue";
//components
import MuonSach from "@/components/admin/MuonSach.vue";
import Sach from "@/components/admin/Sach.vue";
import ThemSach from "@/components/admin/QuanLySach/ThemSach.vue";
import ChinhSuaSach from "@/components/admin/QuanLySach/ChinhSuaSach.vue";
import ThemNhaXuatBan from "@/components/admin/QuanLyNhaXuatBan/ThemNhaXuatBan.vue";
import NhaXuatBan from "@/components/admin/NhaXuatBan.vue";
import ChinhSuaNhaXuatBan from "@/components/admin/QuanLyNhaXuatBan/ChinhSuaNhaXuatBan.vue";

//components

const routes = [
    {
        path: '/',
        name: 'trangchu',
        component: GiaoDienTrangChu
    },
    {
        path: '/quanlydangnhap',
        name: 'quanlydangnhap',
        component: GiaoDienDangNhapQuanLy
    },

    {
        path: '/lichsu',
        name: 'lichsu',
        beforeEnter(to, from, next) {
            const nguoidungStore = useUserStore()
            if (nguoidungStore.token) {
                next()
            } else {
                ElMessage('Vui lòng đăng nhập để xem lịch sử mượn sách!')
                next({ name: 'dangnhap' })
            }
        },
        component: GiaoDienLichSu
    },
    {
        path: '/dangnhap',
        name: 'dangnhap',
        component: GiaoDienDangNhapNguoiDung
    },
    {
        path: '/dangky',
        name: 'dangky',
        component: GiaoDienDangKyNguoiDung
    },


    {
        path: '/quanly',
        name: 'quanly',
        component: GiaoDienQuanLy,

        children: [
            {
                path: '',
                name: 'sach-default',
                component: MuonSach
            },

            {
                path: 'sach',
                name: 'quanly-sach',
                component: Sach
            },

            {
                path: 'nxb',
                name: 'quanly-nxb',
                component: NhaXuatBan
            },

            {
                path: 'nhaxuatban/add',
                name: 'nhaxuatban-add',
                component: ThemNhaXuatBan
            },

            {
                path: 'nxb/edit/:MaNXB',
                name: 'edit-nhaxuatban',
                component: ChinhSuaNhaXuatBan,
                props: true
            },

            {
                path: 'sach/add',
                name: 'add-sach',
                component: ThemSach
            },

            {
                path: 'sach/chinhsua/:MaSach',
                name: 'edit-sach',
                component: ChinhSuaSach,
                props: true
            },

            {
                path: 'muon',
                name: 'quanly-muon',
                component: MuonSach
            }
        ]
    },
    {
        path: '/sach/:MaSach',
        name: 'sach',
        component: ChiTietSach,
        props: true
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
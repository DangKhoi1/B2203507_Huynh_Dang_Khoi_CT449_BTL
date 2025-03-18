<template>
    <Header></Header>
    <main class="container">
        <div v-if="sach" class="detail-container mt-4" data-aos="fade-up">
            <div class="imageBox">
                <img class="image" :src="sach.image" alt="Hình ảnh sách" />
            </div>
            <div class="detailInfor">
                <h4 class="title">{{ sach.TenSach }}</h4>
                <p class="quantity">
                    Số lượng còn lại: <span>{{ sach.SoQuyen - sach.SoLuongDaMuon }}</span>
                </p>
                <div>
                    <p class="detail">Tác giả: {{ sach.TacGia }}</p>
                    <p class="detail" v-if="sach.MaNXB">Nhà xuất bản: {{ sach.MaNXB.TenNXB }}</p>
                    <p class="detail">Năm xuất bản: {{ new Date(sach.NamXuatBan, 0, 1).getFullYear() }}</p>
                </div>
                <p class="pay">Đơn giá: {{ sach.DonGia + " VND" }}</p>
                <div class="borrow-container">
                    <span class="borrow-quantity">Số lượng</span>
                    <el-input-number v-model="quantity" :min="1" :max="20" @change="handleChange" />
                    <div class="mt-3">
                        <button type="button" class="btn btn-primary button-submit" @click="handleBorrow">Mượn
                            Sách</button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Đang tải dữ liệu...</p>
        </div>
    </main>
</template>

<script>
import Header from '@/components/Header.vue';
import { ElButton, ElMessage } from 'element-plus';
import { mapStores } from 'pinia';
import { useBookStore } from '@/piniastores/sach.store';
import { useBorrowBookStore } from '@/piniastores/muonsach.store';
import { useUserStore } from '@/piniastores/nguoidung.store';

export default {
    props: {
        MaSach: { type: String, required: true }
    },

    components: {
        ElButton,
        Header,
    },

    data() {
        return {
            quantity: 1
        }
    },

    computed: {
        ...mapStores(useBookStore, useUserStore, useBorrowBookStore),

        sach() {
            return this.sachStore.getBook(this.MaSach) || null;
        }
    },

    methods: {
        handleChange(value) {
            this.quantity = value;
        },

        async handleBorrow() {
            if (!this.userStore.token) {
                ElMessage('Hãy đăng nhập để mượn sách!');
                this.$router.push('/dangnhap');
                return;
            }
            if (!this.sach) {
                ElMessage('Lỗi: Không tìm thấy sách!');
                return;
            }

            const data = {
                MaSach: this.sach._id,
                SoLuongMuon: this.quantity
            };
            const result = await this.muonsachStore.addBorrow(data);
            ElMessage(result);
        }
    },

    mounted() {
        if (!this.sach) {
            this.sachStore.getAll();
        }
    }
}
</script>
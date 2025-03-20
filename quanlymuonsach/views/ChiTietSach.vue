<template>
    <Header></Header>
    <div class="container">
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
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { ElInputNumber, ElMessage } from 'element-plus';
import { mapStores } from 'pinia';
import { useBookStore } from '@/piniastores/sach.store';
import { useBorrowBookStore } from '@/piniastores/muonsach.store';
import { useUserStore } from '@/piniastores/nguoidung.store';

export default {
    name: 'ChiTietSach',
    components: {
        Header,
        ElInputNumber,
    },
    props: {
        MaSach: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            quantity: 1,
            sach: null
        };
    },
    computed: {
        ...mapStores(useBookStore, useUserStore, useBorrowBookStore),
    },
    methods: {
        handleChange(value) {
            this.quantity = value;
        },
        async fetchBookDetails() {
            try {
                await this.sachStore.getAll();
                this.sach = this.sachStore.getBook(this.MaSach);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
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
        this.fetchBookDetails();
    }
};
</script>

<style scoped>
.detail-container {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    align-items: flex-start;
}

.imageBox {
    flex: 0 0 40%;
    max-width: 350px;
}

.detailInfor {
    flex: 1;
    padding-left: 10rem;
    margin: auto;
}

.image {
    width: 150%;
    height: auto;
    object-fit: contain;
}

.title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
}

.quantity span {
    font-weight: bold;
}

.detail {
    margin-bottom: 0.5rem;
}

.pay {
    font-weight: bold;
    margin: 1rem 0;
}

.borrow-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
}

.borrow-quantity {
    margin-right: 1rem;
}

@media (max-width: 768px) {
    .detail-container {
        flex-direction: column;
    }

    .imageBox {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .detailInfor {
        padding-left: 0;
        margin-top: 1rem;
    }
}
</style>
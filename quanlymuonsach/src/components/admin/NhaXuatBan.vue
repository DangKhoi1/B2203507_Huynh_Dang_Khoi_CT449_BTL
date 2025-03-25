<template>
    <div class="Book">
        <h4 class="text-center m-2 space-text">QUẢN LÝ NHÀ XUẤT BẢN</h4>
        <div class="container create-btn-container d-flex justify-content-end">
            <button type="button" class="btn btn-primary buttonAdd" @click="navigatorToAdd">
                Thêm nhà xuất bản mới
            </button>
        </div>
        <div class="container table-container">
            <el-table v-loading="loading" :data="filteredPublisher" style="width: 100%">
                <el-table-column type="index" label="STT" width="60"></el-table-column>
                <el-table-column label="Tên Nhà xuất bản" prop="TenNXB"></el-table-column>
                <el-table-column label="Địa chỉ Nhà xuất bản" prop="DiaChi"></el-table-column>
                <el-table-column align="right">
                    <template #header>
                        <el-input v-model="searchText" size="small" placeholder="Nhập tên nhà xuất bản để tìm" />
                    </template>
                    <template #default="scope">
                        <el-button size="small" @click="navigatorToEdit(scope.row.MaNXB)">Chỉnh sửa</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row.MaNXB)">Xóa</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { ElMessage, ElMessageBox, ElInput, ElButton } from 'element-plus';
import { usePublisherStore } from '@/piniastores/nhaxuatban.store';
import { mapStores } from 'pinia';

export default {
    components: {
        ElInput,
        ElButton
    },

    data() {
        return {
            searchText: '',
            loading: false,
        };
    },

    computed: {
        ...mapStores(usePublisherStore),
        filteredPublisher() {
            return (this.nhaxuatbanStore.nhaxuatban || []).filter(nhaxuatban =>
                nhaxuatban?.TenNXB?.toLowerCase().includes(this.searchText.toLowerCase())
            );
        }
    },

    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                this.loading = true;
                if (!this.nhaxuatbanStore.fetching) {
                    await this.nhaxuatbanStore.getAll();
                }
            } catch (error) {
                ElMessage.error("Lỗi khi tải dữ liệu!");
            } finally {
                this.loading = false;
            }
        },

        navigatorToAdd() {
            this.$router.push({ name: 'nhaxuatban-add' });
        },

        navigatorToEdit(MaNXB) {
            this.$router.push(`/quanly/nxb/edit/${MaNXB}`);
        },

        async handleDelete(MaNXB) {
            try {
                await ElMessageBox.confirm(
                    "Bạn có chắc chắn muốn xóa nhà xuất bản này?",
                    "Xác nhận",
                    {
                        confirmButtonText: "Xóa",
                        cancelButtonText: "Hủy",
                        type: "warning"
                    }
                );

                await this.nhaxuatbanStore.delete(MaNXB);
                ElMessage.success("Xóa nhà xuất bản thành công!");
                await this.fetchData();
            } catch (error) {
                ElMessage.info("Hủy xóa nhà xuất bản!");
            }
        }
    }
};
</script>

<style>
.Book .space-text {
    margin-top: 24px;
}

.Book .buttonAdd {
    margin-bottom: 16px;
}
</style>

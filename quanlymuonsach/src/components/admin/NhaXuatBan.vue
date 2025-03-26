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
                        <el-button size="small" class="edit-button" @click="navigatorToEdit(scope.row.MaNXB)">Chỉnh
                            sửa</el-button>
                        <el-button size="small" class="delete-button"
                            @click="handleDelete(scope.row.MaNXB)">Xóa</el-button>
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
                ElMessage.success("Xóa nhà xuất bản thành công!"); //success để hiển thị xanh
                await this.fetchData();
            } catch (error) {
                ElMessage.info("Hủy xóa nhà xuất bản!");
            }
        }
    }
};
</script>

<style scoped>
/* Container and Table Styling */
.Book {
    background: #dbeafe;
    /* Xanh nhạt nổi bật */
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #93c5fd;
    /* Viền xanh sáng */
    margin-bottom: 15px;
}

.Book h4 {
    font-size: 24px;
    font-weight: 700;
    /* Tăng độ đậm chữ */
    color: #1e3a8a;
    /* Xanh đậm nổi bật */
    margin: 0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    /* Thêm bóng chữ nhẹ */
}

.space-text {
    margin-top: 24px;
}

.create-btn-container {
    margin-bottom: 15px;
}

.buttonAdd {
    background-color: #2563eb;
    /* Xanh đậm nổi bật */
    border-color: #2563eb;
    color: #ffffff;
    font-weight: 600;
    border-radius: 6px;
    padding: 8px 16px;
    transition: background-color 0.3s ease;
    margin-bottom: 16px;
}

.buttonAdd:hover {
    background-color: #1e40af;
    /* Xanh đậm hơn khi hover */
    border-color: #1e40af;
}

.table-container {
    background-color: #ffffff;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #bfdbfe;
    /* Viền xanh nhạt */
}

/* Table Styling */
.el-table {
    border-radius: 8px;
    overflow: hidden;
}

.el-table th {
    background-color: #3b82f6;
    /* Xanh sáng cho header */
    color: #ffffff;
    /* Chữ trắng để nổi bật */
    font-weight: 600;
    font-size: 15px;
    padding: 12px 0;
    white-space: nowrap;
}

.el-table td {
    padding: 12px 0;
    font-size: 14px;
    color: #1f2937;
    /* Xám đậm */
}

.el-table--striped .el-table__row--striped td {
    background-color: #f9fafb;
    /* Xám nhạt cho hàng xen kẽ */
}

.el-table__row:hover td {
    background-color: #e0f2fe;
    /* Xanh rất nhạt khi hover */
}

/* Search Input Styling */
.el-input__inner {
    border-radius: 6px;
    border: 1px solid #93c5fd;
    /* Viền xanh sáng */
    font-size: 13px;
    color: #1f2937;
    background-color: #f9fafb;
    /* Nền xám nhạt */
}

.el-input__inner:focus {
    border-color: #2563eb;
    /* Xanh đậm khi focus */
}

/* Button Styling */
.el-button {
    border-radius: 6px;
    font-weight: 600;
    padding: 8px 16px;
    border: none;
    /* Loại bỏ viền mặc định */
}

/* Nút "Chỉnh sửa" */
.edit-button {
    background-color: #2563eb !important;
    /* Xanh đậm cho nút "Chỉnh sửa" */
    border-color: #2563eb !important;
    color: #ffffff !important;
    transition: background-color 0.3s ease;
}

.edit-button:hover {
    background-color: #1e40af !important;
    /* Xanh đậm hơn khi hover */
    border-color: #1e40af !important;
}

/* Nút "Xóa" */
.delete-button {
    background-color: #dc2626 !important;
    /* Đỏ đậm nổi bật cho nút "Xóa" */
    border-color: #dc2626 !important;
    color: #ffffff !important;
    transition: background-color 0.3s ease;
}

.delete-button:hover {
    background-color: #b91c1c !important;
    /* Đỏ đậm hơn khi hover */
    border-color: #b91c1c !important;
}
</style>
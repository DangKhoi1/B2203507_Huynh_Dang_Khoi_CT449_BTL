<template>
  <div class="Book">
    <h4 class="text-center m-2">QUẢN LÝ SÁCH</h4>
    <div class="container create-btn-container d-flex justify-content-end">
      <button type="button" class="btn btn-primary buttonAdd" @click="handleNavigateToAddBook">
        Thêm sách mới
      </button>
    </div>
    <div class="container table-container">
      <el-table :data="filteredBooks" style="width: 100%">
        <el-table-column type="expand">
          <template #default="scope">
            <div class="row">
              <div class="col-6">
                <p m="t-0 b-2">Tên sách: {{ scope.row?.TenSach }}</p>
                <p m="t-0 b-2">Đơn giá: {{ scope.row?.DonGia + " VND" }}</p>
                <p m="t-0 b-2">Tổng số quyển: {{ scope.row?.SoQuyen }}</p>
                <p m="t-0 b-2">
                  Năm xuất bản:
                  {{ new Date(scope.row?.NamXuatBan, 0, 1).getFullYear() }}
                </p>
              </div>
              <div class="col-6">
                <p m="t-0 b-2">Nhà xuất bản: {{ scope.row?.MaNXB?.TenNXB }}</p>
                <p m="t-0 b-2">Tác giả: {{ scope.row?.TacGia }}</p>
                <p m="t-0 b-2">
                  Số lượng đã mượn: {{ scope.row?.SoLuongDaMuon }}
                </p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="STT" width="70"> </el-table-column>
        <el-table-column label="Mã sách" prop="MaSach" />
        <el-table-column label="Tên Sách" prop="TenSach">
          <template #default="scope">
            <router-link :to="`/sach/${scope.row.MaSach}`">
              {{ scope.row.TenSach }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="Đơn giá">
          <template #default="scope">
            {{ scope?.row?.DonGia + " VND" }}
          </template>
        </el-table-column>
        <el-table-column label="Số lượng trong kho">
          <template #default="scope">
            {{ scope?.row?.SoQuyen - scope.row?.SoLuongDaMuon || 0 }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="searchText" size="small" placeholder="Nhập tên sách để tìm kiếm" />
          </template>
          <template #default="scope">
            <el-button size="small" class="edit-button" @click="navigatorToEdit(scope.row.MaSach)">Chỉnh sửa</el-button>
            <el-button size="small" class="delete-button" @click="handleDelete(scope.row.MaSach)">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ElButton, ElInput, ElMessage } from "element-plus";
import { useBookStore } from "@/piniastores/sach.store";
import { mapStores } from "pinia";

export default {
  components: {
    ElInput,
  },

  data() {
    return {
      searchText: "",
    };
  },

  computed: {
    ...mapStores(useBookStore),
    filteredBooks() {
      if (this.sachStore.danhSachSach) {
        return this.sachStore.danhSachSach.filter((sach) =>
          sach.TenSach.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }
      return [];
    },
  },

  methods: {
    handleNavigateToAddBook() {
      this.$router.push({
        name: "add-sach",
      });
    },
    navigatorToEdit(MaSach) {
      this.$router.push({
        name: "edit-sach",
        params: {
          MaSach,
        },
      });
    },

    async handleDelete(MaSach) {
      const result = await this.sachStore.delete(MaSach);
      this.danhSachSach = this.sachStore.danhSachSach;
      ElMessage(result);
    },
  },
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

/* Expandable Row Styling */
.row {
  background: #f1f5f9;
  /* Xám xanh nhạt */
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #bfdbfe;
  /* Viền xanh nhạt */
}

.row p {
  font-size: 13px;
  color: #4b5563;
  margin: 0 0 8px 0;
}

.row p:hover {
  color: #2563eb;
  /* Xanh sáng khi hover */
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
}

.edit-button {
  background-color: #2563eb;
  /* Xanh đậm cho nút "Chỉnh sửa" */
  border-color: #2563eb;
  color: #ffffff;
  transition: background-color 0.3s ease;
}

.edit-button:hover {
  background-color: #1e40af;
  /* Xanh đậm hơn khi hover */
  border-color: #1e40af;
}

.delete-button {
  background-color: #dc2626 !important;
  /* Đỏ đậm nổi bật cho nút "Xóa" */
  border-color: #dc2626 !important;
  color: #ffffff !important;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #b91c1c !important;
  /* Đỏ đậm hơn khi hover */
  border-color: #b91c1c !important;
}

/* Link Styling */
a {
  color: #2563eb;
  /* Xanh đậm */
  font-weight: 600;
  text-decoration: none;
}

a:hover {
  color: #1e3a8a;
  /* Xanh đậm hơn khi hover */
}

/* Price Styling */
.el-table-column:nth-child(4) span {
  color: #ea580c;
  /* Cam đậm nổi bật cho đơn giá */
  font-weight: 600;
}
</style>
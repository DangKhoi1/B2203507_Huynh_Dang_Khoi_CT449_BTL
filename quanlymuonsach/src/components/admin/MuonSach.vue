<template>
  <div class="page-wrapper">
    <div class="Book bg-gray-50 p-4 rounded-lg shadow-sm">
      <h4 class="text-center m-2 text-2xl font-bold text-blue-700">QUẢN LÝ MƯỢN SÁCH</h4>
    </div>
    <div class="container table-container">
      <el-table :data="muonsachStore.AdminMuon" style="width: 100%" stripe border class="rounded-lg overflow-hidden">
        <el-table-column type="expand">
          <template #default="scope">
            <div class="row bg-gray-100 p-4 rounded">
              <div class="col-6">
                <h6 class="text-blue-600 font-semibold mb-3">Thông tin đọc giả:</h6>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">
                  Họ và Tên:
                  {{ scope.row?.MaDocGia.HoLot + " " + scope.row?.MaDocGia.Ten }}
                </p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">
                  Số điện thoại: {{ scope.row?.MaDocGia.SoDienThoai }}
                </p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">Giới tính: {{
                  scope.row?.MaDocGia.GioiTinh }}</p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">Địa chỉ: {{ scope.row?.MaDocGia.DiaChi
                }}</p>
              </div>
              <div class="col-6">
                <h6 class="text-blue-600 font-semibold mb-3">Thông tin mượn:</h6>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">Số lượng mượn: {{
                  scope.row?.SoLuongMuon }}</p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">
                  Ngày lấy sách:
                  {{
                    scope.row?.NgayMuon &&
                    new Date(scope.row?.NgayMuon).toLocaleString()
                  }}
                </p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">
                  Ngày trả sách:
                  {{
                    scope.row?.NgayTra &&
                    new Date(scope.row?.NgayTra).toLocaleString()
                  }}
                </p>
                <p class="text-gray-700 hover:text-blue-600 transition-colors">Nhân viên: {{
                  scope.row?.MaNhanVien?.HoTenNV }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Mã mượn sách" prop="MaMuonSach" class-name="text-gray-700"></el-table-column>
        <el-table-column label="Tên Sách">
          <template #default="scope">
            <router-link :to="`/sach/${scope.row?.MaSach?.MaSach}`"
              class="text-blue-600 hover:text-blue-800 transition-colors font-medium">
              {{ scope.row?.MaSach?.TenSach }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column label="Tên người mượn" class-name="text-gray-700">
          <template #default="scope">
            {{ scope.row?.MaDocGia.Ten }}
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" prop="TrangThai">
          <template #default="scope">
            <el-select class="w-100" v-model="scope.row.TrangThai" placeholder="Trạng thái" size="large"
              style="width: 240px">
              <el-option label="Đang chờ nhận sách" value="chưa giải quyết" class="text-yellow-600" />
              <el-option label="Đã lấy sách" value="mượn" class="text-green-600" />
              <el-option label="Đã trả sách" value="trả" class="text-blue-600" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="Đơn giá" class-name="text-gray-700">
          <template #default="scope">
            <span class="text-orange-600 font-semibold">
              {{ scope.row?.MaSach?.DonGia }} VND
            </span>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #default="scope">
            <el-button size="small" class="save-button mr-2" @click="
              handleSave(
                { _id: scope.row._id, TrangThai: scope.row.TrangThai },
                {}
              )
              ">
              Lưu
            </el-button>
            <el-button size="small" class="delete-button" @click="handleDelete(scope.row._id)">
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { useBorrowBookStore } from "@/piniastores/muonsach.store";
import { ElMessage, ElButton, ElInput } from "element-plus";
import { mapStores } from "pinia";
export default {
  mounted() { //Hàm chạy khi component được tạo
    const muon = useBorrowBookStore();
    if (!muon.fetchAdmin) {
      muon.getAllForAdmin();
    }
  },
  components: {
    ElInput,
  },
  computed: { //Cho phép component truy cập dữ liệu từ store mà không cần gọi trực tiếp
    ...mapStores(useBorrowBookStore), //ánh xạ
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    async handleSave(data) {
      const result = await this.muonsachStore.updateBorrowForAdmin(data);
      ElMessage(result);
    },
    async handleDelete(muonId) {
      const result = await this.muonsachStore.deleteBorrowForAdmin(muonId);
      ElMessage(result);
    },
  },
};
</script>

<style scoped>
/* Page Wrapper Styling */
.page-wrapper {
  background-color: #e6f0fa;
  /* Màu xanh nhạt giống trong hình */
  min-height: 100vh;
  /* Đảm bảo background phủ toàn trang */
  padding: 20px;
  /* Thêm padding để nội dung không sát lề */
}

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
  /* Tăng padding cho header */
}

.el-table td {
  padding: 12px 0;
  /* Tăng padding cho ô */
  font-size: 14px;
  color: #1f2937;
  /* Xám đậm hơn để rõ ràng */
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
.row.bg-gray-100 {
  background: #f1f5f9;
  /* Xám xanh nhạt */
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #bfdbfe;
  /* Viền xanh nhạt */
}

.row.bg-gray-100 h6 {
  font-size: 15px;
  color: #1e3a8a;
  /* Xanh đậm */
  font-weight: 600;
  margin-bottom: 10px;
}

.row.bg-gray-100 p {
  font-size: 13px;
  color: #4b5563;
  margin-bottom: 6px;
}

.row.bg-gray-100 p:hover {
  color: #2563eb;
}

/* Select Dropdown Styling */
.el-select .el-input__inner {
  border-radius: 6px;
  border: 1px solid #93c5fd;
  /* Viền xanh sáng */
  font-size: 13px;
  color: #1f2937;
  background-color: #f9fafb;
  /* Nền xám nhạt */
}

.el-select .el-input__inner:focus {
  border-color: #2563eb;
  /* Xanh đậm khi focus */
}

.el-select-dropdown {
  border-radius: 6px;
  border: 1px solid #bfdbfe;
}

.el-select-dropdown__item {
  font-size: 13px;
  padding: 8px 15px;
}

.el-select-dropdown__item:hover {
  background-color: #bfdbfe;
  color: #1e3a8a;
}

/* Trạng thái nổi bật hơn */
.el-select-dropdown__item.text-yellow-600 {
  color: #f59e0b !important;
  font-weight: 500;
}

.el-select-dropdown__item.text-green-600 {
  color: #16a34a !important;
  font-weight: 500;
}

.el-select-dropdown__item.text-blue-600 {
  color: #2563eb !important;
  font-weight: 500;
}

/* Button Styling */
.el-button {
  border-radius: 6px;
  font-weight: 600;
  /* Tăng độ đậm chữ */
  padding: 8px 16px;
  /* Tăng kích thước nút */
  border: none;
  /* Loại bỏ viền mặc định */
}

/* Nút "Lưu" */
.save-button {
  background-color: #2563eb !important;
  /* Xanh đậm */
  border-color: #2563eb !important;
  color: #ffffff !important;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #1e40af !important;
  /* Xanh đậm hơn khi hover */
  border-color: #1e40af !important;
}

/* Nút "Xóa" */
.delete-button {
  background-color: #dc2626 !important;
  /* Đỏ đậm nổi bật */
  border-color: #dc2626 !important;
  color: #ffffff !important;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #b91c1c !important;
  /* Đỏ đậm hơn khi hover */
  border-color: #b91c1c !important;
}

/* Link Styling */
.text-blue-600 {
  color: #2563eb;
  font-weight: 600;
}

.text-blue-600:hover {
  color: #1e3a8a;
}

/* Price Styling */
.text-orange-600 {
  color: #ea580c;
  /* Cam đậm nổi bật */
  font-weight: 600;
}
</style>
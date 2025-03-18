<template>
  <Header></Header>

  <main class="container">
    <h1 class="text-center m-2">Lịch sử mượn sách</h1>
    <el-table :data="muonsachStore.SachMuon" stripe style="width: 100%">
      <el-table-column type="expand">
        <template #default="scope">
          <div class="row">
            <div class="col-12">
              <p>
                Ngày mượn sách:
                {{ scope.row?.NgayMuon ? new Date(scope.row.NgayMuon).toLocaleString() : "Không có dữ liệu" }}
              </p>
              <p>
                Ngày trả:
                {{ scope.row?.NgayTra ? new Date(scope.row.NgayTra).toLocaleString() : "Không có dữ liệu" }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="MaMuonSach" label="Mã mượn" width="180" />
      <el-table-column label="Tên sách" width="180">
        <template #default="scope">
          <router-link v-if="scope.row.MaSach" :to="`/sach/${scope.row.MaSach.MaSach}`">
            {{ scope.row.MaSach.TenSach }}
          </router-link>
          <span v-else>Không có dữ liệu</span>
        </template>
      </el-table-column>
      <el-table-column prop="SoLuongMuon" label="Số lượng" width="180" />
      <el-table-column prop="TrangThai" label="Trạng thái">
        <template #default="scope">
          {{ convertToVN(scope.row.TrangThai) }}
        </template>
      </el-table-column>
      <el-table-column label="Đơn giá">
        <template #default="scope">
          {{ scope.row.MaSach?.DonGia ?? "Không có giá" }} VND
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template #default="scope">
          <el-button v-if="scope.row.TrangThai === 'chưa giải quyết'" size="small" type="danger"
            @click="handleDelete(scope.row._id)">Xóa</el-button>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<script>
import { ElButton } from "element-plus";
import Header from "@/components/Header.vue";
import { mapStores } from "pinia";
import { useBorrowBookStore } from "@/piniastores/muonsach.store";
export default {
  name: "lichsu",
  components: {
    ElButton,
    Header,
  },
  computed: {
    ...mapStores(useBorrowBookStore),
  },
  mounted() {
    const muon = useBorrowBookStore();
    if (!muon.fetching) {
      muon.getAllForUser().then(() => {
        console.log("Dữ liệu mượn sách:", this.muonsachStore.SachMuon);
      });
    }
  },
  methods: {
    handleDelete(id) {
      this.muonsachStore.deleteBorrowForUser(id);
    },
    convertToVN(status) {
      switch (status) {
        case "chưa giải quyết":
          return "Đang chờ nhận sách";
        case "mượn":
          return "Đã lấy sách";
        case "trả":
          return "Đã trả sách";
        default:
          return "Không xác định";
      }
    },
  },
};
</script>

<style></style>

<template>
  <div class="body">
    <!-- <Header></Header> -->
    <mauDangNhapQuanLy @handleSubmit="submit"></mauDangNhapQuanLy>
  </div>
</template>
<script>
import mauDangNhapQuanLy from "@/components/mauDangNhapQuanLy.vue";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/piniastores/nguoidung.store";
// import Header from "@/components/Header.vue";
export default {
  name: "quanlydangnhap",
  components: {
    mauDangNhapQuanLy,
    // Header,
  },
  methods: {
    async submit(data) {
      const nguoiDungStore = useUserStore();
      if (data.SoDienThoai && data.MatKhau) {
        var result = await nguoiDungStore.NhanVienDangNhap({
          SoDienThoai: data.SoDienThoai,
          MatKhau: data.MatKhau,
        });
        if (nguoiDungStore.staffToken) {
          this.$router.push({ name: "quanly-muon" });
        }
        ElMessage(result);
      }
    },
  },
};
</script>
<style></style>
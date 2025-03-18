<template lang="">
    <div class="body">
        <Header></Header>
        <mauDangNhapNguoiDung @handleSubmit="submit"></mauDangNhapNguoiDung>
    </div>  
</template>
<script>
import mauDangNhapNguoiDung from "@/components/mauDangNhapNguoiDung.vue";
import { useUserStore } from "@/piniastores/nguoidung.store";
import { ElMessage } from "element-plus";
import Header from "@/components/Header.vue";
export default {
  name: "nguoidungdangnhap",
  components: {
    mauDangNhapNguoiDung,
    Header,
  },
  methods: {
    submit: async function (data) {
      if (data.SoDienThoai && data.MatKhau) {
        var result = await useUserStore().NguoiDungDangNhap({ SoDienThoai: data.SoDienThoai, MatKhau: data.MatKhau })
        if (useUserStore().token) {
          this.$router.push({ name: 'trangchu' });
        }
        ElMessage(result);
      }
    },
  },
};
</script>
<style></style>
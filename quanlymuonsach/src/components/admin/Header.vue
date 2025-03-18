<template>
  <header id="header">
    <div class="container-fluid">
      <div class="row inner-wrap">
        <div class="col-md-2">
          <div class="main-logo">
            <router-link to="/quanly/muon"><img src="../../assets/image/image.png" alt="" /></router-link>
          </div>
        </div>
        <ul class="menu-list col-md-8 col-8">
          <li class="menu-item">
            <router-link to="/quanly/NXB" :class="`${routeBookCheck() == 'quanly-nxb' ? 'active' : ''}`">Quản Lý Nhà
              xuất bản</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/quanly/sach" :class="`${routeBookCheck() == 'quanly-sach' ? 'active' : ''}`">Quản Lý
              Sách</router-link>
          </li>
          <li class="menu-item">
            <router-link to="/quanly/muon" :class="`${routeBookCheck() == 'quanly-muon' ? 'active' : ''}`">Quản Lý Mượn
              Sách</router-link>
          </li>
        </ul>
        <div class="btn-group col-md-2 button-header">
          <button type="button" class="btn btn-primary button-logout" @click="DangXuat">
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { ElButton, ElInput, ElMessage } from "element-plus";
import { useUserStore } from "@/piniastores/nguoidung.store";

export default {
  components: {
    ElInput,
  },

  data() {
    return {
      value: "",
    };
  },

  methods: {
    DangXuat() {
      useUserStore().NhanVienDangXuat();
      ElMessage("Đăng xuất thành công!");
      this.$router.push({
        path: "/quanlydangnhap",
      });
    },
    routeBookCheck() {
      return this.$route.name;
    },
    changeActive(value) {
      this.active = value;
    },
  },
};
</script>
<style>
#header .inner-wrap .menu-item a {
  font-weight: 600;
}
</style>
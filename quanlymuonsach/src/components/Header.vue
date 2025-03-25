<template>
  <header id="header">
    <div class="container-fluid">
      <div class="row inner-wrap">
        <!-- Logo -->
        <div class="col-md-2 logo-box">
          <div class="main-logo" data-aos="fade-right">
            <router-link to="/" class="logo-wrapper">
              <img src="../assets/image/image.png" class="logo" />
              <span class="logo-text">LibraryBook</span>
            </router-link>
          </div>
        </div>
        <!-- Ô tìm kiếm -->
        <div class="col-md-4">
          <div class="search">
            <input type="text" class="input-search" placeholder="Nhập tên sách để tìm kiếm"
              v-model="sachStore.searchText" />
          </div>
        </div>
        <!-- Tiêu đề Trang Chủ -->
        <div class="main-menu col-4 col-md-2">
          <ul class="menu-list">
            <li class="menu-item">
              <router-link to="/" :class="`${routeBookCheck() == 'trangchu' ? 'active' : ''}`">Trang Chủ</router-link>
            </li>
          </ul>
        </div>
        <!-- Menu Dropdown -->
        <div class="col-md-4 d-flex menu-container">
          <div v-if="user.token" class="btn-group button-header me-2">
            <button type="button" class="btn btn-primary button-logout" @click="NguoiDungDangXuat(user)">
              Đăng xuất
            </button>
          </div>
          <div class="btn-group button-header menu-button">
            <button type="button" class="btn dropdown-toggle button-header-item" data-bs-toggle="dropdown"
              aria-expanded="false" style="font-size: 20px;">
              Menu
            </button>
            <ul class="dropdown-menu dropdown-menu-end drop-down ul-dropdown">
              <li v-if="!user.token">
                <button class="dropdown-item custom-button" type="button" @click="handleNavigateToLoginUser">
                  Đăng nhập
                </button>
              </li>
              <li>
                <router-link to="/lichsu" :class="`${routeBookCheck() == 'lichsu' ? 'active' : ''}`">
                  <button class="dropdown-item custom-button" type="button">
                    Lịch sử mượn sách
                  </button>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { ElInput, ElButton, ElMessage } from "element-plus";
import { useUserStore } from "@/piniastores/nguoidung.store";
import { mapStores } from "pinia";
import { useBookStore } from "@/piniastores/sach.store";

export default {
  components: {
    ElInput,
  },

  data() {
    return {
      value: "",
      user: useUserStore(),
    };
  },

  computed: {
    ...mapStores(useBookStore),
  },

  methods: {
    NguoiDungDangXuat(user) {
      user.NguoiDungDangXuat();
      ElMessage("Đăng xuất thành công!");
      this.$router.push("/");
    },
    routeBookCheck() {
      return this.$route.name;
    },

    handleNavigateToLogin() {
      this.$router.push("/dangnhap");
    },
    handleNavigateToLoginUser() {
      this.$router.push("/dangnhap");
    },
  },
};
</script>

<style>
#header .inner-wrap .menu-item a {
  font-weight: 600;
}

#header .inner-wrap .button-header button {
  font-weight: 600;
}

.el-dropdown i {
  width: 100%;
  height: 100%;
}

.el-icon svg {
  height: 40px;
  width: 40px;
}

.dropdown-menu {
  min-width: 200px;
  /* Đảm bảo dropdown có chiều rộng đủ */
}

.dropdown-item.custom-button {
  background-color: #007bff;
  /* Màu nền giống button */
  color: white;
  /* Màu chữ trắng */
  border: none;
  border-radius: 5px;
  /* Bo góc */
  padding: 10px 15px;
  /* Khoảng cách bên trong */
  margin: 5px 10px;
  /* Khoảng cách bên ngoài */
  text-align: center;
  width: calc(100% - 20px);
  /* Chiều rộng button, trừ margin */
  transition: background-color 0.3s;
  /* Hiệu ứng chuyển màu */
}

.dropdown-item.custom-button:hover {
  background-color: #0056b3;
  /* Màu khi hover */
}

.dropdown-item a {
  text-decoration: none;
  /* Bỏ gạch chân của link */
  color: inherit;
  /* Kế thừa màu từ button */
  display: block;
  width: 100%;
}

.button-header .button-logout {
  font-size: 20px;
  /* Đảm bảo kích thước chữ giống với nút Menu */
}

.d-flex {
  display: flex;
  align-items: center;
}

.me-2 {
  margin-right: 10px;
  /* Khoảng cách giữa nút Menu và Đăng xuất */
}

.logout-left {
  margin-right: auto;
  /* Đẩy nút Đăng xuất sang trái */
}

.col-md-4 {
  padding-left: 130px;
  margin-left: 40px;
  width: 30%;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  text-decoration: none;
  /* Bỏ gạch chân của router-link */
}

.logo {
  width: 120px;
  /* Kích thước logo hiện tại */
  height: 120px;
  object-fit: contain;
}

.logo-text {
  margin-left: 10px;
  /* Khoảng cách giữa logo và chữ */
  font-size: 24px;
  /* Kích thước chữ */
  font-weight: 700;
  /* Độ đậm của chữ */
  color: var(--dark-text-color);
  /* Màu chữ, sử dụng biến đã định nghĩa */
  font-family: var(--heading-font);
  /* Font chữ, sử dụng Poppins */
  text-transform: uppercase;
  /* Chuyển chữ thành in hoa */
}
</style>
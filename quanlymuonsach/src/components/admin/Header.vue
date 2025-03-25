<template>
  <header id="header">
    <div class="container-fluid">
      <div class="row inner-wrap">
        <!-- Logo và chữ LibraryBook -->
        <div class="col-md-2 logo-box">
          <div class="main-logo">
            <router-link to="/quanly/muon" class="logo-wrapper">
              <img src="../../assets/image/image.png" alt="LibraryBook Logo" class="logo" />
              <span class="logo-text">LibraryBook</span>
            </router-link>
          </div>
        </div>
        <!-- Các liên kết điều hướng -->
        <div class="col-md-8 d-flex navigation-links">
          <ul class="menu-list">
            <li class="menu-item">
              <router-link to="/quanly/NXB" :class="`${routeBookCheck() == 'quanly-nxb' ? 'active' : ''}`">
                Quản Lý Nhà xuất bản
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/quanly/sach" :class="`${routeBookCheck() == 'quanly-sach' ? 'active' : ''}`">
                Quản Lý Sách
              </router-link>
            </li>
            <li class="menu-item">
              <router-link to="/quanly/muon" :class="`${routeBookCheck() == 'quanly-muon' ? 'active' : ''}`">
                Quản Lý Mượn Sách
              </router-link>
            </li>
          </ul>
        </div>
        <!-- Nút Đăng xuất -->
        <div class="col-md-2 d-flex menu-container">
          <div class="btn-group button-header">
            <button type="button" class="btn btn-primary button-logout" @click="DangXuat">
              Đăng xuất
            </button>
          </div>
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
/* Định dạng chung cho header */
#header {
  padding: 10px 0;
  border-bottom: 1px solid #E0E0E0;
  background-color: var(--header-color);
  /* #E6F0FA */
}

/* Định dạng inner-wrap */
#header .inner-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* Phân bố đều các phần tử */
  padding: 0 20px;
}

/* Định dạng logo và chữ LibraryBook */
.logo-box {
  display: flex;
  align-items: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo {
  width: 120px;
  height: 120px;
  object-fit: contain;
}

.logo-text {
  margin-left: 10px;
  font-size: 24px;
  font-weight: 700;
  color: var(--dark-text-color);
  /* #2f2f2f */
  font-family: var(--heading-font);
  /* Poppins */
  text-transform: uppercase;
}

/* Định dạng danh sách liên kết điều hướng */
.navigation-links {
  justify-content: center;
  /* Căn giữa các liên kết */
}

#header .menu-list {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  /* Phân bố đều các liên kết */
  align-items: center;
  margin-bottom: 0;
  padding: 0;
  width: 100%;
}

#header .menu-list .menu-item {
  margin: 0 20px;
  /* Khoảng cách giữa các liên kết */
}

#header .menu-list .menu-item a {
  font-size: 18px;
  font-weight: 600;
  color: var(--dark-text-color);
  /* #2f2f2f */
  text-decoration: none;
  transition: color 0.3s ease;
}

#header .menu-list .menu-item a:hover,
#header .menu-list .menu-item a.active {
  color: var(--accent-color);
  /* #4A90E2 */
}

/* Định dạng nút Đăng xuất */
.menu-container {
  justify-content: start;
  /* Căn phải */
}

.button-header .button-logout {
  font-size: 18px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 5px;
  background-color: var(--accent-color);
  /* #4A90E2 */
  border: none;
  transition: background-color 0.3s ease;
}

.button-header .button-logout:hover {
  background-color: #3267B2;
  /* Màu đậm hơn khi hover */
}

/* Responsive */
@media (max-width: 768px) {
  .logo {
    width: 80px;
    height: 80px;
  }

  .logo-text {
    font-size: 18px;
    margin-left: 5px;
  }

  .navigation-links {
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  #header .menu-list .menu-item {
    margin: 10px;
  }

  #header .menu-list .menu-item a {
    font-size: 16px;
  }

  .button-header .button-logout {
    font-size: 16px;
    padding: 6px 15px;
  }
}
</style>
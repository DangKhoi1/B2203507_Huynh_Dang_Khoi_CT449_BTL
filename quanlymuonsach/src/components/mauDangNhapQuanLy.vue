<template>
  <div class="container">
    <div class="loginContainer" data-aos="fade-up">
      <div class="loginBox">
        <div class="box-head">
          <img src="../assets/image/image.png" class="logo" />
          <p
            style="font-size: 25px; font-weight: 550; margin-top: -25px; margin-left: -10px; margin-bottom: 0px; margin-bottom: -30px;">
            Đăng nhập</p>
        </div>
        <form @submit.prevent="submit" class="flex gap-1 m-4 infor-type">
          <input type="text" class="form-control mt-4" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Số điện thoại" v-model="SoDienThoai"
            autocomplete="tel" />
          <input type="password" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Mật khẩu" v-model="MatKhau"
            autocomplete="current-password" />
          <button type="submit" class="btn btn-primary button-submit">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SoDienThoai: "",
      MatKhau: "",
    };
  },
  methods: {
    routeBookCheck() {
      return this.$router.currentRoute._value.name; // tên của route hiện tại đã cấu hình
    },
    submit() {
      this.$emit("handleSubmit", {
        SoDienThoai: this.SoDienThoai,
        MatKhau: this.MatKhau,
      });
    },
  },
};
</script>

<style>
.container .loginContainer {
  min-width: 800px;
  min-height: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 60px;
}

.container .loginContainer .loginBox {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 32px 16px;
  border-radius: 4px;
}

.container .box-head {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.container .box-head p {
  padding-top: 40px;
  margin-bottom: 0px;
  font-weight: 600;
}

.container .loginContainer .loginBox .logo {
  width: 80px;
}

.container .loginContainer .loginBox .infor-type {
  margin: 0;
}

/* Thêm kiểu để căn giữa nút */
.container .loginContainer .loginBox .infor-type {
  flex-direction: column;
  /* Xếp các phần tử theo cột */
  align-items: center;
  /* Căn giữa theo chiều ngang */
}

.container .loginContainer .loginBox .infor-type input,
.container .loginContainer .loginBox .infor-type button {
  width: 100%;
  /* Đảm bảo chiều rộng đồng nhất */
  max-width: 300px;
  /* Giới hạn chiều rộng tối đa */
}

.container .loginContainer .loginBox .infor-type button {
  margin-top: 1rem;
  /* Thêm khoảng cách phía trên nút */
}
</style>
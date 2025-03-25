<template>
  <Header></Header>
  <div class="container">
    <div class="loginContainer" data-aos="fade-up">
      <div class="loginBox">
        <div>
          <img src="../assets/image/image.png" class="logo" />
          <p
            style="font-size: 25px; font-weight: 550; margin-top: 3px; margin-left: -10px; margin-bottom: 0px; margin-bottom: -30px;">
            Đăng ký
          </p>
          <p></p>
        </div>

        <div class="flex gap-1 m-4">
          <input type="text" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Họ" v-model="HoLot" />
          <input type="text" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Tên" v-model="Ten" />
          <input type="text" class="form-control mt-4" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Số điện thoại" v-model="SoDienThoai" />
          <input type="password" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Mật khẩu" v-model="MatKhau" />
          <input type="password" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Mật khẩu xác thực" v-model="MatKhau2" />
          <select class="form-control mt-3" v-model="GioiTinh" aria-label="Chọn giới tính">
            <option value="" disabled selected>Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <input type="text" class="form-control mt-3" aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm" placeholder="Địa chỉ" v-model="DiaChi" />
        </div>
        <button type="button" class="btn btn-primary mt-2 button-submit" @click="submit">
          Đăng ký
        </button>
        <span class="mt-4">Bạn đã có tài khoản?
          <router-link to="/dangnhap"><span>Đăng nhập</span></router-link></span>
      </div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from "@/piniastores/nguoidung.store";
import { ElMessage } from "element-plus";
import Header from "./Header.vue";
export default {
  data() {
    return {
      HoLot: "",
      Ten: "",
      GioiTinh: "",
      DiaChi: "",
      SoDienThoai: "",
      MatKhau: "",
      MatKhau2: "",
      message: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    async submit() {
      if (this.MatKhau !== this.MatKhau2) {
        this.message = "Mật khẩu xác thực bị sai! Vui lòng nhập lại!";
        ElMessage(this.message);
        return;
      }

      if (
        this.MatKhau &&
        this.MatKhau == this.MatKhau2 &&
        this.GioiTinh &&
        this.DiaChi &&
        this.HoLot &&
        this.Ten &&
        this.SoDienThoai
      ) {
        this.message = await useUserStore().NguoiDungDangKy({
          HoLot: this.HoLot,
          Ten: this.Ten,
          GioiTinh: this.GioiTinh,
          DiaChi: this.DiaChi,
          SoDienThoai: this.SoDienThoai,
          MatKhau: this.MatKhau,
        });
        ElMessage(this.message);
      } else {
        this.message = "Vui lòng nhập đầy đủ thông tin!";
        ElMessage(this.message);
      }
      if (
        this.message ===
        "Đăng ký thành công! Hãy đăng nhập vào tài khoản của bạn"
      ) {
        this.$router.push("/dangnhap");
      }
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

.container .loginContainer .loginBox .logo {
  width: 80px;
}
</style>
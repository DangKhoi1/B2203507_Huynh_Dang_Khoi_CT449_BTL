<template>
  <div class="publisher">
    <div class="d-flex flex-column">
      <label>Tên sách:</label>
      <el-input
        v-model="sach.TenSach"
        style="width: 300px"
        size="large"
        placeholder="Nhập tên sách"
      />
    </div>
    <div class="d-flex flex-column my-2">
      <label>Đơn giá (VND):</label>
      <el-input
        v-model="sach.DonGia"
        type="number"
        style="width: 300px"
        size="large"
        placeholder="Nhập đơn giá (VND)"
      />
    </div>
    <div class="d-flex flex-column my-2">
      <label>Số quyển:</label>
      <el-input
        v-model="sach.SoQuyen"
        style="width: 300px"
        size="large"
        placeholder="Nhập số lượng"
      />
    </div>
    <div class="d-flex flex-column my-2" style="width: 300px">
      <label>Nhà xuất bản:</label>
      <el-select
        class="w-100"
        v-model="sach.MaNXB"
        placeholder="Chọn nhà xuất bản"
        size="large"
        style="width: 240px"
      >
        <el-option
          v-for="nxb in danhSachNhaXuatBan"
          :key="nxb._id"
          :label="nxb.TenNXB"
          :value="nxb._id"
        />
      </el-select>
    </div>
    <div class="d-flex flex-column my-2">
      <label>Năm xuất bản:</label>
      <el-input
        v-model="sach.NamXuatBan"
        type="number"
        style="width: 300px"
        size="large"
        placeholder="Nhập năm xuất bản"
      />
    </div>
    <div class="d-flex flex-column my-2">
      <label>Tác giả:</label>
      <el-input
        v-model="sach.TacGia"
        style="width: 300px"
        size="large"
        placeholder="Nhập tác giả"
      />
    </div>
    <div class="d-flex flex-column my-2" style="width: 300px">
      <label>Hình ảnh:</label>
      <el-input
        v-model="sach.image"
        style="width: 300px"
        size="large"
        placeholder="Nhập Link ảnh"
      />
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <button
        type="button"
        class="btn btn-primary button-submit"
        @click="submit"
      >
        Lưu
      </button>
    </div>
  </div>
</template>
<script>
import { usePublisherStore } from "@/piniastores/nhaxuatban.store";

export default {
  components: {},
  props: {
    sach: { type: Object, required: false },
  },
  data() {
    return {
      danhSachNhaXuatBan: usePublisherStore().nhaxuatban,
    };
  },
  methods: {
    submit() {
      this.$emit("handleSubmit", this.sach);
    },
  },
};
</script>
<style>
.publisher {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
<script>
export default {
  name: "DanhMucSach",
  props: {
    data: { type: Object, required: true },
  },
  methods: {
    handleNavigate() {
      this.$router.push({
        name: "sach",
        params: {
          id: this.data.MaSach,
        },
      });
    },
    handleNavigateToDetail() {
      this.$router.push(`/sach/${this.data.MaSach}`);
    },
  },
};
</script>
<template>
  <div class="col-md-3">
    <div class="product-item">
      <div class="product-style">
        <img :src="data.image" alt="Books" class="product-item" />
        <button type="button" class="add-to-detail" data-product-tile="add-to-cart" @click="handleNavigateToDetail">
          Xem chi tiết
        </button>
      </div>
      <div class="product-infor">
        <h3 class="text-limit">{{ data.TenSach }}</h3>
        <h6>{{ data.TacGia }}</h6>
      </div>
    </div>
  </div>
</template>
<style>
.text-limit {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
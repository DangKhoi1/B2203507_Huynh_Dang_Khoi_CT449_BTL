<template>
  <div class="body">
    <mauDangKy @handleSubmit="dangnhap"></mauDangKy>
  </div>
</template>
<script>
import mauDangKy from "@/components/mauDangKy.vue";
export default {
  name: "dangkynguoidung",
  components: {
    mauDangKy,
  },
  methods: {
    dangnhap(data) {
      console.log(data);
    },
  },
};
</script>
<style></style>
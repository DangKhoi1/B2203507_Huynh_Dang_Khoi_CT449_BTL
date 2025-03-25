<template lang="">
    <div>
        <h4 class="m-4 text-center">THÊM SÁCH</h4>
        <mauSach :sach="data" @handleSubmit="addBook" />
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import mauSach from "./mauSach.vue";
import { useBookStore } from "@/piniastores/sach.store";
export default {
  components: {
    mauSach,
  },
  data() {
    return {
      data: {},
    };
  },
  methods: {
    async addBook(data) {
      let result = await useBookStore().add(data);
      ElMessage(result);
      this.$router.push("/quanly/sach");
    },
  },
};
</script>
<style></style>
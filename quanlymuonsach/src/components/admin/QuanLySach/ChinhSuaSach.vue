<template lang="">
    <div>
        <h4 class="m-4 text-center">CHỈNH SỬA SÁCH</h4>
        <mauSach :sach="data" @handleSubmit="submit" />
    </div>
</template>
<script>
import { ElMessage } from "element-plus";
import mauSach from "./mauSach.vue";
import { useBookStore } from "@/piniastores/sach.store";

export default {
  props: {
    MaSach: { type: String, required: true },
  },
  components: {
    mauSach,
  },
  data() {
    const sach = useBookStore().getBook(this.MaSach) || {};
    return {
      data: {
        ...sach,
        MaNXB: sach.MaNXB ? sach.MaNXB._id : null,
        NamXuatBan: new Date(sach.NamXuatBan, 0, 1).getFullYear(),
      },
    };

  },
  methods: {
    async submit(data) {
      const result = await useBookStore().update(data);
      ElMessage(result);
      this.$router.push("/quanly/sach");
    },
  },
};
</script>
<style></style>
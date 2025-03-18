<template lang="">
    <Header></Header>   
    <DanhSachSach></DanhSachSach>
    <Footer></Footer>
</template>
<script>
import Header from "@/components/Header.vue";
import { ElButton } from "element-plus";
import DanhSachSach from "@/components/home/DanhSachSach.vue";
import { useBookStore } from "@/piniastores/sach.store";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    ElButton,
    DanhSachSach,
    Header,
    Footer,
  },
  mounted() {
    const sachStore = useBookStore();
    if (!sachStore.fetching) {
      sachStore.getAll();
    }
  },
};
</script>
<style>
main .pagination {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
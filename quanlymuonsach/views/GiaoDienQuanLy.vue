<template>
  <Header></Header>
  <RouterView />
</template>
<script>
import Header from "@/components/admin/Header.vue";
import { useBookStore } from "@/piniastores/sach.store";
export default {
  name: "QuanLy",
  components: {
    Header,
  },

  mounted() {
    const sachStore = useBookStore();
    if (!sachStore.fetching) {
      sachStore.getAll();
    }
  },
  methods: {
    dangnhap(data) {
      console.log(data);
    },
  },
  computed: {
    // active: ''
  },
};
</script>
<style></style>
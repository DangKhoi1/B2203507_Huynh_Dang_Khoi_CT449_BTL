<template lang="">
    <section id="featured-books">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-header align-center" data-aos="flip-up">
                        <h2 class="section-title">CHÀO MỪNG BẠN ĐẾN VỚI LIBRARY BOOK</h2>
                        <h3 style="line-height: 0.5em;">Đến với LibraryBook và tận hưởng bầu trời kiến thức mà chúng tôi mang đến cho bạn! </h3>
                    </div>
                    <div class="product-list"  data-aos="fade-up">
                        <div class="row">
                            <DanhMucSach v-for="sach in sachStore.getBooksFromTitle(sachStore.searchText)" :key="sach._id" :data="sach">
                            </DanhMucSach>
                        </div>
                    </div>
                </div> 
            </div> 
        </div> 
    </section> 
</template>
<script>
import { mapStores } from "pinia";
import DanhMucSach from "./DanhMucSach.vue";
import { useBookStore } from "@/piniastores/sach.store";

export default {
  name: "DanhSachSach",
  computed: {
    ...mapStores(useBookStore),
  },
  components: {
    DanhMucSach,
  },
  methods: {},
  data() {
    return {};
  },
};
</script>
<style></style>
<template lang="">
    <div class="publisher">
        <div class="d-flex flex-column">
            <label>Tên nhà xuất bản:</label>
            <el-input v-model="nhaxuatban.TenNXB" style="width: 300px" size="large" placeholder="Nhập tên nhà xuất bản" />
        </div>
        <div class="d-flex flex-column my-4">
            <label>Địa chỉ:</label>
            <el-input v-model="nhaxuatban.DiaChi" style="width: 300px" size="large" placeholder="Nhập địa chỉ" />
        </div>
        <div class="d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-primary button-submit"@click="submit">Lưu</button>
        </div>
    </div>
</template>
<script>
export default {
    components: {},
    props: {
        nhaxuatban: { type: Object, required: false }
    },
    data() {
        return {}
    },
    methods: {
        submit() {
            this.$emit('handleSubmit', this.nhaxuatban);
        }
    }
}
</script>
<style>
.publisher {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
</style>
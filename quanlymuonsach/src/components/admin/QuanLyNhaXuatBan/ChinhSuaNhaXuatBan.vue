<template lang="">
    <div>
        <h4 class="m-4 text-center">Chỉnh sửa Nhà Xuất Bản</h4>
        <mauNhaXuatBan :nhaxuatban="data" @handleSubmit="submit" />

    </div>
</template>
<script>
import { ElMessage } from 'element-plus';
import { usePublisherStore } from '@/piniastores/nhaxuatban.store';
import mauNhaXuatBan from './mauNhaXuatBan.vue';
export default {
    components: {
        mauNhaXuatBan
    },
    props: {
        MaNXB: { type: String, default: false }
    },
    data() {
        return {
            data: usePublisherStore().getPublisher(this.MaNXB)
        }
    },
    methods: {
        async submit(data) {
            const result = await usePublisherStore().update(data)
            ElMessage(result)
            this.$router.push('/quanly/NXB')
        }
    }
}
</script>
<style></style>
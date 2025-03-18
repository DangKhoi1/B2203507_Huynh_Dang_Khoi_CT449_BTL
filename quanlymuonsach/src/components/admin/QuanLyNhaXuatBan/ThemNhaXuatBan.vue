<template lang="">
    <div>
        <h4 class="m-4 text-center">Thêm Nhà Xuất Bản</h4>
        <mauNhaXuatBan :nhaxuatban="data" @handleSubmit="submit" />
    </div>
</template>
<script>
import mauNhaXuatBan from './mauNhaXuatBan.vue';
import { usePublisherStore } from '@/piniastores/nhaxuatban.store';
import { ElMessage } from 'element-plus';

export default {
    components: {
        mauNhaXuatBan
    },
    data() {
        return {
            data: {}
        }
    },
    methods: {
        async submit(data) {
            const result = await usePublisherStore().add(data)
            ElMessage(result)
            this.$router.push('/quanly/NXB')
        }
    }
}
</script>
<style></style>
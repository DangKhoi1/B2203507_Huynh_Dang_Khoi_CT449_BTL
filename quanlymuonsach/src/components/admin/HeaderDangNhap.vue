<template>
    <header id="header">
        <div class="container-fluid">
            <div class="row inner-wrap">
                <div class="col-md-2">
                    <div class="main-logo">
                        <router-link to="/quanlydangnhap"><img src="../../assets/image/image.png" alt=""
                                style="margin-left: -650px;" /></router-link>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { ElInput } from "element-plus";

export default {
    components: {
        ElInput,
    },
    methods: {
    },
};
</script>
<style>
#header .inner-wrap .menu-item a {
    font-weight: 600;
}
</style>
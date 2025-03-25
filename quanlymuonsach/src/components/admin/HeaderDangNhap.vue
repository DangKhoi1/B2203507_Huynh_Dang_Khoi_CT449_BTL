<template>
    <header id="header">
        <div class="container-fluid">
            <div class="row inner-wrap">
                <div class="col-md-2">
                    <div class="col-md-2 logo-box">
                        <div class="main-logo">
                            <router-link to="/quanly/muon" class="logo-wrapper">
                                <img src="../../assets/image/image.png" alt="LibraryBook Logo" class="logo" />
                                <span class="logo-text">LibraryBook</span>
                            </router-link>
                        </div>
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
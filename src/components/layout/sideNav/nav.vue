<template>
    <div class="nav">
        <div class="logo" v-show="!getState">LOGO</div>
        <div class="logo" v-show="getState">LG</div>
        <el-menu
            mode="vertical"
            :show-timeout="200"  
            :default-active="onRoutes" 
            text-color="#fff"
            active-text-color="#000"
            background-color="#32C2CD"
            unique-opened router   
            class="collapseMenu"
            :collapse="getState"
        >
            <el-nav :routes="getRouters"/>
        </el-menu>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import elNav from './sidenavItem';

    export default {
        components:{
            elNav
        },
        computed: {
            ...mapGetters(["getState", "getRouters"]),
            onRoutes: function() {
                return this.$route.path;
            }
        }
    };
</script>


//测试父子组件传参问题
<template>
    <div class="father_Wrap">
        <v-son :datas = "datas"/>
    </div>    
</template>
<script>
    import vSon from './son/son';
    export default {
        components:{
            vSon
        },
        data(){
            return {
                datas:[]
            }
        },
        mounted() {
            this.setDatas();
        },
        methods:{
            setDatas(){
                setTimeout(() => {
                    this.datas = [1, 2, 3, 4];
                }, 2000);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

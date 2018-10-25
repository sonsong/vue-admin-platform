<template>
    <div class="base-bar-wrap">
        <template v-for="(item, index) in barsName">
            <div :key="index" :class="item.active ? 'bar-is-active' : ''" @click="chooseBar(item.type)">{{item.title}}</div>
        </template>
    </div>
</template>
<script>
    export default {
        props:{
            barsName:{
                type: Array,
                require: true
            }
        },
        data(){
            return {
            }
        },
        methods:{
            chooseBar(type){
                this.barsName.map(b =>{
                    if(b.type === type){
                        b.active = true;
                    }else{
                        b.active = false;
                    }
                })
                this.$emit("barSelected", type);
            }
        }
    }
</script>
<style lang="less" scoped>
    .base-bar-wrap{
        height: 50px;
        width: 100%;
        display: flex;
        text-align: center;
        div{
            width: 100px;
            height: 50px;
            line-height: 50px;
            cursor: pointer;
            box-sizing: border-box;
            &:first-child{
                margin-left: 20px
            }
        }
        .bar-is-active{
            border-top: 2px solid #3094fb;
            color:#3094fb
        }
    }
</style>

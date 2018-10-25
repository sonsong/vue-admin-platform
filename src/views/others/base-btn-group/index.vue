<template>
    <div class="btn-group-wrap">
        <div class="btn-group">
            <template v-for="(btn, index) in btnsName">
                <div :key="index" :class="btn_type === btn.type ? 'btn-is-active' : ''" @click="chooseBtn(btn.type)">{{btn.name}}</div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            btnsName:{
                type: Array,
                default() {
                    return [
                        {type: "date", name: "日"},
                        {type: "month", name: "月"},
                        {type: "year", name: "年"}
                    ]
                }
            } 
        },
        data(){
            return{
                btn_type: "date"
            }
        },
        methods:{
            chooseBtn(type){
                this.btn_type = type;
            }
        }
    }
</script>
<style lang="less" scoped>
    .btn-group-wrap{
        .btn-group{
            display: flex;
            text-align: center;
            font-size: 1.4rem;
            div{
                width: 80px;
                height: 30px;
                line-height: 30px;
                margin-top: 10px;
                border: 1px solid #e9e9e9;
                cursor: pointer;
            }
            .btn-is-active{
                border-color: #3094fb;
                color: #3094fb 
            }
        }
    }
</style>

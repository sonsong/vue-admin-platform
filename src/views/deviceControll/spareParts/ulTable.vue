<template>
    <div class="ul_table_wrap">
        <ul class="table table_head">
            <li v-for="(head,i) in heads" :key="i">{{head}}</li>
        </ul>
        <div v-loading="loading" element-loading-text="努力加载中">
            <ul class="table table_content" v-for="(value,j) in contents" :key="j" v-show="!noData">
                <li v-for="(v,k) in value" :key="k">{{v}}</li>
            </ul>
            <div class="noData" v-show="noData">
                <div>暂无数据</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        heads:{
            type:Array,
            required:true
        },
        contents:{
            type:Array,
            required:true
        }
    },
    data(){
        return {
            loading : true,
            noData : true
        }
    },
    created() {
        this.loading = false;
        if(this.contents.length !== 0){
            this.noData = false
        }
    },
}
</script>
<style lang="less" scoped>
    .ul_table_wrap{
        width: calc(100% - 50px);
        margin: 0 auto;
        .table{
            height: 50px;
            line-height: 50px;
            display: flex;
            border-bottom:2px solid #f4f1ef;
            &:hover{
                background: rgba(245,245,245,1);
            }
            & > li{
                width: 530px;
                text-align: left;
                color: rgba(51,51,51,1);
                &:first-child{
                    box-sizing: border-box;
                    width: 250px;
                    padding-left: 10px;
                }
            }
        }
        .table_head{
            background:rgba(245,245,245,1);
            color:rgba(153, 153, 153, 1);
            font-weight: bold;
        }
        .noData{
            width: 100%;
            height: 500px;
            line-height: 500px;
            margin: 0 auto;
            border:2px solid rgba(245,245,245,1);
            border-top: none;
            text-align: center;
            box-sizing: border-box;
            span{
                font-size: 3rem;
            }
        }
        @media only screen and (max-width: 1366px){
            .table{
                height: 40px;
                line-height: 40px;
                & > li{
                    &:first-child{
                        padding-left: 5px;
                    }
                }
            }
            
        }
    }
</style>



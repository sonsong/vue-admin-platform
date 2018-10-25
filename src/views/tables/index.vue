//设备监控--备品备件
<template>
    <div class="tables_wrap">
        <div class="section">
            <div class="section_row">
                <div class="section_one">
                    <div class="section_title">XXXXX</div>
                    <ul-table :heads="highValueHead" :contents="highValueDatas"/>
                    <el-pagination
                        @current-change="currPageChangeHandle"
                        :current-page.sync="currPage"
                        :page-size="pageSize"
                        :total="total"
                        layout="total, prev, pager, next, jumper"
                        background
                        class="_paging"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import DataUtils from "utils/dateFormat.js";
    import ulTable from "./ulTable";
    export default {
        components: {
            ulTable,
        },
        data() {
            return {
                currPage:1,
                total:1000,
                totalPage:100,
                pageSize:10,
                //选择的车间
                productType: "高货值",
                //高货值列表表格标题
                highValueHead: [
                    "序号",
                    "领用时间",
                    "产品名称",
                    "参考成本价",
                    "当前库存量",
                    "库存货值(元)"
                ],
                //高货值列表数据
                highValueDatas: [
                    ["1", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["2", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["3", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["4", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["5", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["6", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["7", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["8", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["9", "2018-08-15", "xxxx", 1.23, 1223, 123],
                    ["10", "2018-08-15", "xxxx", 1.23, 1223, 123]
                ]
            };
        },
        methods:{
            currPageChangeHandle(){}
        }
    };
</script>
<style lang="less" scoped>
    .tables_wrap {
        width: 100%;
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 0.8);
        .section_row {
            display: flex;
            justify-content: space-between;
            height: 700px;
            margin-top: 20px;
            background-color: #fff;
            &:first-child{
                height: 560px;
            }
            &:last-child {
                margin-bottom: 100px;
                height: 730px;
            }
            .section_one {
                width: 100%;
            }
            .section_two {
                width: 49%;
            }
            .section_title {
                display: flex;
                justify-content: space-between;
                height: 60px;
                line-height: 60px;
                color: #000;
                font-weight: bold;
                padding-left: 30px;
            }
            ._paging{
                position: relative;
                width: 100%;
                text-align: right;
                right: 50px;
                top: 20px;
                z-index: 4;
            }
        }

        @media only screen and (max-width: 1366px){
            .section_row {
                height: 550px;
                margin-top: 10px;
                &:first-child{
                    height: 460px;
                }
                &:last-child {
                    margin-bottom: 100px;
                    height: 600px;
                }
                .section_title {
                    height: 60px;
                    line-height: 60px;
                    padding-left: 24px;
                }
                ._paging{
                    top: 10px;
                }
            }
        }
    }
</style>


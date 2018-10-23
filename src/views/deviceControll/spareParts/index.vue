//设备监控--备品备件
<template>
    <div class="spare_parts_wrap">
        <div class="top">
           <div class="top_head">备用备件使用情况</div>
           <div class="top_select_timd">
               <div>日期选择</div> 
               <base-time-picker :date="date" :watchDateChangeHandle="watchDateChangeHandle"/>
            </div> 
        </div>
        <div class="total">
            <div class="curr_stock_total">
                <div class="title">当前库存总货值</div>
                <div class="price"><span>123456</span>元</div>
            </div>
            <div class="year_stock_total">
                <div class="title">当年已领用总货值</div>
                <div class="price"><span>123456</span>元</div>
            </div>
            <div class="month_stock_total">
                <div class="title">当月已领用总货值</div>
                <div class="price"><span>123456</span>元</div>
            </div>
        </div>
        <div class="section">
            <div class="section_row">
                <div class="section_two">
                    <div class="section_title">
                        <div class="title">当月前十领用量</div>
                        <el-radio-group v-model="currMonth_used_total">
                            <el-radio-button label="月"/>
                            <el-radio-button label="年"/>
                        </el-radio-group>
                    </div>
                    <barTrend ref="barTrend_usedTotal" :comm_values="usedTotal"/>
                </div>
                <div class="section_two">
                    <div class="section_title">
                        <div class="title">当年前十领用货值</div>
                        <el-radio-group v-model="currYear_used_total">
                            <el-radio-button label="月"/>
                            <el-radio-button label="年"/>
                        </el-radio-group>
                    </div>
                    <barTrend ref="barTrend_usedPrice" :comm_values="usedPrice"/>
                </div>
            </div>
            <div class="section_row">
                <div class="section_one">
                    <el-radio-group v-model="productType" class="workshopType section_workshop">
                        <el-radio-button label="高货值"/>
                        <el-radio-button label="高库存"/>
                        <el-radio-button label="低库存"/>
                    </el-radio-group>
                    <ul-table :heads="highValueHead" :contents="highValueDatas"/>
                </div>
            </div>
            <div class="section_row">
                <div class="section_one">
                    <div class="section_title">当月领用清单(2018/08/01-2018/08/09)</div>
                    <ul-table :heads="highValueHead" :contents="highValueDatas"/>
                    <el-pagination
                            @current-change="currPageChangeHandle"
                            :current-page.sync="currPage"
                            :page-size="pageSize"
                            layout="prev, pager, next, jumper"
                            :total="total"
                            background
                            class="_paging"
                    />
                    <div class="totalPage"><span class="currPage">{{currPage}}</span>/{{totalPage}}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import DataUtils from "@/utils/dateFormat.js";
import ulTable from "./ulTable";
import barTrend from "./barTrend";
export default {
  components: {
    ulTable,
    barTrend
  },
  data() {
    return {
      date: new Date(),
      currPage:1,
      total:1000,
      totalPage:100,
      pageSize:10,
      currYear_used_total: "月",
      currMonth_used_total: "月",
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
      ],
      usedTotal:{
            yData: ["螺栓", "cc", "bb", "aa", "dd", "ee"],
            xunit: "量",
            ref:"barTrend_usedTotaol",
            colors: ["rgba(87, 183, 255, 1)"], 
            legend: ["领用量"]
      },
      usedPrice:{
            yData: ["xx", "cc", "bb", "aa", "dd", "ee"],
            xunit: "元",
            ref:"barTrend_usedPrice",
            colors: ["rgba(87, 183, 255, 1)"], 
            legend: ["货值"]
      },
    };
  },
  watch: {
    date(time) {
      console.log(time);
    },
  },
  mounted() {
    this.loadBarTrendData();
  },
  methods: {
    //获取柱状图的数据
    loadBarTrendData(){
        //当月前十领用量
        let userdTotal_data = [18203, 23489, 29034, 104970, 131744, 630230];
        this.$refs.barTrend_usedTotal.drawBarTrend(userdTotal_data, false, false);

        //当年前十领用货值
        let userdPrice_data = [31123, 123, 1324, 13, 1354, 343];
        this.$refs.barTrend_usedPrice.drawBarTrend(userdPrice_data, false, false);

        window.addEventListener("resize", ()=>{
            this.$refs.barTrend_usedTotal.drawBarTrend(userdTotal_data, false, false);
            this.$refs.barTrend_usedPrice.drawBarTrend(userdPrice_data, false, false);
        })
    },
    //切换当前页
    currPageChangeHandle(){
    },
    /**
     * 监听时间改变
     */
    watchDateChangeHandle(time) {
      this.date = time;
    }
  }
};
</script>
<style lang="less">
    .spare_parts_wrap {
        width: 100%;
        height: 100%;
        font-size: 1.6rem;
        color: rgba(0, 0, 0, 0.8);
        .top {
                width: 100%;
                height: 120px;
                background: #fff;
                .top_head {
                    height: 60px;
                    line-height: 60px;
                    margin-left: 50px;
                    font-size: 1.9rem;
                    font-weight: bold;
                }
                .top_select_timd {
                    display: flex;
                    margin-left: 50px;
                }
                .top_select_timd > div:first-child {
                    color: #4c4747;
                    box-sizing: border-box;
                    height: 35px;
                    line-height: 35px;
                    padding-right: 20px;
                }
        }
        .total {
                display: flex;
                justify-content: space-between;
                width: 100%;
                height: 150px;
                line-height: 150px;
                margin-top: 20px;
                & > div {
                    width: 32%;
                    background: #fff;
                }
                .title,
                .price {
                    height: 30px;
                    line-height: 30px;
                }
                .title {
                    font-size: 1.9rem;
                    color: rgba(0, 0, 0, 0.6);
                    margin: 33px 0 0 50px;
                }
                .price {
                    font-size: 1.6rem;
                    color: rgba(0, 0, 0, 0.4);
                    margin: 15px 0 0 50px;
                span {
                    color: rgba(99, 186, 77, 0.8);
                    font-size: 3.7rem;
                    padding-right: 15px;
                }
            }
        }
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
                .el-radio-group {
                    margin: 10px 30px 10px 0;
                }
            }
            ._paging{
                position: relative;
                width: 100%;
                text-align: right;
                right: 50px;
                top: 20px;
                z-index: 4;
            }
            .totalPage{
                    position: relative;
                    height: 37px;
                    line-height: 37px;
                    width: 100%;
                    text-align: right;
                    right: 160px;
                    top: -18px;
                    z-index: 3;
            }
        }
        .workshop_choose {
            padding: 0 30px;
        }
        .section_workshop {
            color: #000;
            font-weight: bold;
            height: 100px;
            line-height: 100px;
        }
        .el-radio-button:first-child .el-radio-button__inner {
            margin-left: 30px;
            border-right: none;
        }
        .el-radio-button__inner,
        .el-radio-button:first-child .el-radio-button__inner,
        .el-radio-button:last-child .el-radio-button__inner {
            border:1px solid rgba(217, 217, 217, 1);
            border-radius: 0px;
            width: 80px;
            height: 43px;
            line-height: 43px;
            padding: 0;
            font-weight: bold;
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner, .el-radio-button__inner:hover {
            background:rgba(0,193,222,0.1);
            color:rgba(0,193,222,1);
            border:1px solid rgba(0,193,222,1);
        }
        .el-radio-button__inner:hover,
        .el-radio-button:first-child .el-radio-button__inner:hover,
        .el-radio-button:last-child .el-radio-button__inne:hover{
            border:1px solid rgba(0,193,222,1);
        }
        .el-pagination.is-background .btn-next, 
        .el-pagination.is-background .btn-prev, 
        .el-pagination.is-background .el-pager li,
        .el-pagination .el-input__inner{
            width:37px;
            height:37px;
            line-height:37px;
            color:rgba(77, 85, 89, 1);
            background:rgba(255,255,255,1);
            border-radius:3px;
            border-radius:3px;
            border:1px solid rgba(220,220,220,1);
        }
        .el-pagination.is-background .btn-next:hover, 
        .el-pagination.is-background .btn-prev:hover, 
        .el-pagination.is-background .el-pager li:hover,
        .el-pagination .el-input__inner:hover
        .el-pagination__jump:hover,
        .currPage{
            color:rgba(0, 193, 222, 1);
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
            color: rgba(0, 193, 222, 1);
            border:1px solid rgba(0,193,222,1);
            background: #fff;
        }
        .el-pagination__jump{
            margin-left: 80px;
        }

        @media only screen and (max-width: 1366px){
            .top {
                height: 100px;
                .top_head {
                    height: 45px;
                    line-height: 45px;
                    font-size: 1.7rem;
                    margin-left: 30px;
                }
                .top_select_timd{
                    margin-left: 30px;
                }
                .top_select_timd > div:first-child {
                    padding-right: 10px;
                }
            }
            .total {
                height: 120px;
                line-height: 120px;
                margin-top: 10px;
                .title,
                .price {
                    height: 30px;
                    line-height: 30px;
                }
                .title {
                    font-size: 1.7rem;
                    margin: 22px 0 0 30px;
                }
                .price {
                    margin: 10px 0 0 30px;
                    span {
                        font-size: 3rem;
                        padding-right: 15px;
                    }
                }
            }
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
                    .el-radio-group {
                        margin: 10px 30px 10px 0;
                    }
                }
                ._paging{
                    top: 10px;
                }
                .totalPage{
                    height: 30px;
                    line-height: 30px;
                    right: 155px;
                    top: -22px;
                }
            }
            .section_workshop {
                height: 60px;
                line-height: 60px;
            }

            .el-radio-button__inner,
            .el-radio-button:first-child .el-radio-button__inner,
            .el-radio-button:last-child .el-radio-button__inner {
                width: 70px;
                height: 30px;
                line-height: 30px;
                margin-top: 5px;
            }

            .el-pagination.is-background .btn-next, 
            .el-pagination.is-background .btn-prev, 
            .el-pagination.is-background .el-pager li,
            .el-pagination .el-input__inner{
                width:30px;
                height:30px;
                line-height:30px;
            }
        }
    }
</style>


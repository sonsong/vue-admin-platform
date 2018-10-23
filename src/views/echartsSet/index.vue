//echart图集合
<template>
    <div class="echarts_wrap">
        <div class="my-row">
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">Line图例</div>
                    <el-radio-group v-model="grapType">
                        <el-radio-button label="Line图"/>
                        <el-radio-button label="Bar图"/>
                    </el-radio-group>
                </div>
                <my-line :comm_values="line_data" ref="myLine_component"/>
            </div>
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">Bar图例</div>
                </div>
                <my-bar :comm_values="bar_data" ref="myBar_component"/>
            </div>
        </div>
        <div class="my-row">
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">pie图例</div>
                </div>
                <my-pie :comm_values="pie_data" ref="myPie_component"/>
            </div>
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">LineBar图例</div>
                </div>
                <my-line-bar :comm_values="line_bar_data" ref="myLineBar_component"/>
            </div>
        </div>
        <div class="my-row">
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">xxx图例</div>
                </div>
            </div>
            <div class="my-col-2">
                <div class="my-tools">
                    <div class="my-title">xxx图例</div>
                </div>
            </div>
        </div>
        <div class="my-row">
            <div class="my-col-1">
                <div class="my-tools">
                    <div class="my-title">Map图例</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const echarts = require("echarts/lib/echarts");
    require("echarts/lib/chart/line");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/legend");
    import myBar from './echartsListComponent/bar.vue';
    import myLine from './echartsListComponent/line.vue';
    import myLineBar from './echartsListComponent/lineBar.vue';
    import myPie from './echartsListComponent/pie.vue';

    export default {
        components:{
            myBar,
            myLine,
            myLineBar,
            myPie
        },
        data(){
            return{
                grapType:"Line图",
                lineData:[],
                bar_data:{
                    yData: ["ff", "cc", "bb", "aa", "dd", "ee", "mm"],
                    xunit: "",
                    ref:"my_bar_component",
                    colors: ["rgba(87, 183, 255, 1)"], 
                    legend: ["xxx"]
                },
                line_data:{
                    xData: [1, 2, 3, 4, 5, 6, 7],
                    xunit: "",
                    ref:"my_line_component",
                    colors: ["rgba(87, 183, 255, 1)"], 
                    legend: ["xxx"]
                }, 
                line_bar_data:{
                    xData: [1, 2, 3, 4, 5, 6, 7],
                    xunit: "",
                    yunit:["jjj", "hhh"],
                    ref:"my_line_bar_component",
                    colors: ["rgba(87, 183, 255, 1)", "rgba(246, 122, 70, 1)", "rgba(89, 126, 247, 1)"], 
                    legend: ["xxx", "yyy", "zzz"]
                }, 
                pie_data:{
                    xData: [],
                    xunit: "",
                    yunit:"",
                    ref:"my_pie_component",
                    colors: ['RGBA(89, 126, 247, 1)','RGBA(115, 209, 61, 1)','RGBA(255, 236, 61, 1)',
                                'RGBA(255, 169, 64, 1)','RGBA(246, 122, 70, 1)'], 
                    legend: ["aaa", "bbb", "ccc", "ddd", "eee"]
                }
            }
        },
        watch:{
            grapType(value){
                let _type = "line";
                if(value === "Bar图"){
                    _type = "bar";
                }

                this.$refs.myLine_component.drawLineGraphics(this.LineData, _type, false, false);
            }
        },
        mounted() {
            this.loadBarData();
            this.loadLineData();
            this.loadLineBarData();
            this.loadPieData();
        },
        methods:{
            loadBarData(){
                const data = [3,2,5,7,3,8,3];
                this.$refs.myBar_component.drawBarGraphics(data, false, false);
            },
            loadLineData(){
                this.LineData = [1,2,5,6,3,8,9];
                this.$refs.myLine_component.drawLineGraphics(this.LineData, "line", false, false);
            },
            loadLineBarData(){
                const line_1Data = [1,3,5,7,9,23,1];
                const line_2Data = [1,4,2,4,13,9,2];
                const barData = [1,3,5,7,9,14,4];
                this.$refs.myLineBar_component.drawLineBarGraphics(line_1Data, line_2Data, barData, false, false);
            },
            loadPieData(){
                const data = [{value:335},{value:135},{value:235},{value:35}, {value:123}];
                const legend = this.pie_data.legend;
                for (const index in data) {
                    data[index].name = legend[index];
                }

                this.$refs.myPie_component.drawPieGraphics(data, false, false);
            }
        }
    }
</script>
<style lang="less" scoped>
    .echarts_wrap{
        width: 100%;
        .my-row{
            display: flex;
            justify-content: space-between;
            width: 100%;
            min-height: 500px;
            margin-top: 20px;
            &:first-child{
                margin-top: 0px;
            }
            &:last-child{
                margin-bottom: 100px;
            }
            .my-col-1{
                width: 100%;
            }
            .my-col-2{
                width: 49.5%;
            }
            .my-col-3{
                width: 32.5%;
            }
            .my-col-4{
                width: 24.5%;
            }
            .my-col-1, .my-col-2, .my-col-3, .my-col-4{
                background: #fff;
                border-radius: 20px;
                transition: .5s;
                &:hover{
                    cursor: pointer;
                    box-shadow: 0px 10px rgb(207, 207, 207);
                    transform: translateY(-10px)
                }
                .my-tools{
                    display: flex;
                    justify-content: space-between;
                    height: 50px;
                    line-height: 50px;
                    margin: 0 30px;
                    .my-title{
                        font-size: 2rem;
                    }
                    .el-radio-group{
                        line-height: 50px;
                    }
                }
            }
        }
    }
</style>

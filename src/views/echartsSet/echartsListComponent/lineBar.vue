<template>
    <div class="my_line_bar_bar" :ref="comm_values.ref" v-loading="loading" element-loading-text="努力加载中"/>
</template>
<script>
    const echarts = require("echarts/lib/echarts");
    require("echarts/lib/chart/line");
    require("echarts/lib/chart/bar");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/legend");

    export default {
        props: {
            comm_values:{
                type:Object,
                require:true
            }
        },
        data() {
            return {
                loading:true
            };
        },
        methods: {
            /**
             * 绘制line_bar图
             *  data：y轴数据
             */
             drawLineBarGraphics(line_1Data = [0,0,0,0,0,0,0], line_2Data = [0,0,0,0,0,0,0], barData = [0,0,0,0,0,0,0], 
                noData = true, loading = true) {

                
                const that = this;

                const ref = that.$refs[that.comm_values.ref];

                const line_bar = echarts.init(ref);
                line_bar.clear();
                
                this.loading = loading;

                if(noData){
                    line_bar.dispose();
                    ref.style.background = "";
                    return;
                }

                ref.style.background = "transparent";

                const option = {
                    color: that.comm_values.colors,
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            //line_bar, cross, shodow
                            type: "cross"
                        },
                    },
                    legend: {
                        data: [
                                {name:that.comm_values.legend[0], icon:'circle'},
                                {name:that.comm_values.legend[1], icon:'circle'},
                                {name:that.comm_values.legend[2], icon:'circle'}
                            ],
                        bottom: 15
                    },
                    grid: {
                        bottom: "10%",
                        top: "10%",
                        containLabel: true
                    },
                    xAxis: {
                        type: "category",
                        axisTick: {
                            show: false
                        },
                        name:that.comm_values.xunit,
                        data:that.comm_values.xData,
                    },
                    yAxis: [
                        {
                            name:that.comm_values.yunit[0],
                            type: "value",
                            axisLine: { show: false },
                            axisTick: { show: false },
                        },
                        {
                            name:that.comm_values.yunit[1],
                            type: "value",
                            max:100,
                            min:0,
                            axisLine: { show: false },
                            axisTick: { show: false },
                        },

                    ],
                    series: [
                        {
                            name: that.comm_values.legend[0],
                            barWidth:'60%',
                            type: "bar",
                            data: barData
                        },
                        {
                            name: that.comm_values.legend[1],
                            smooth:true,
                            type: "line",
                            data: line_1Data
                        },
                        {
                            name: that.comm_values.legend[2],
                            smooth:true,
                            type: "line",
                            data: line_2Data
                        }
                    ]
                };
                line_bar.resize();
                line_bar.setOption(option);
            }
        }
    };
</script>
<style lang="less" scoped>
    .my_line_bar_bar {
        width: 100%;
        height: 440px;
        margin-top: 10px;
        background: url("../../../../static/imgs/noData.png") no-repeat center;
    }
    @media only screen and (max-width: 1366px){
       .my_line_bar_bar {
            height: 340px;
        }     
    }
</style>

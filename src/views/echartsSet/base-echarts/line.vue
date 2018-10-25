<template>
    <div class="my_line" :ref="comm_values.ref" v-loading="loading" element-loading-text="努力加载中"/>
</template>
<script>
    const echarts = require("echarts/lib/echarts");
    require("echarts/lib/chart/line");
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
             * 绘制line图
             *  data：y轴数据
             */
             drawLineGraphics(data = [0,0,0,0,0,0,0], type="line", noData = true, loading = true) {

                const that = this;

                const ref = that.$refs[that.comm_values.ref];

                const line = echarts.init(ref);
                line.clear();
                
                this.loading = loading;

                if(noData){
                    line.dispose();
                    ref.style.background = "";
                    return;
                }

                ref.style.background = "transparent";

                const option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                            //line, cross, shodow
                            type: "cross"
                        },
                    },
                    legend: {
                        data: [{name:that.comm_values.legend[0], icon:'circle'}],
                        bottom: 15
                    },
                    grid: {
                        bottom: "15%",
                        top: "5%",
                        left: "4%",
                        right: "15%"
                    },
                    xAxis: {
                        type: "category",
                        axisTick: {
                            show: false
                        },
                        name:that.comm_values.xunit,
                        data:that.comm_values.xData,
                    },
                    yAxis: {
                        type: "value",
                        axisLine: { show: false },
                        axisTick: { show: false },
                    },
                    series: [
                        {
                            name: that.comm_values.legend[0],
                            smooth:true,
                            barWidth:'60%',
                            type: type,
                            color: that.comm_values.colors,
                            data: data
                        }
                    ]
                };
                line.resize();
                line.setOption(option);
            }
        }
    };
</script>
<style lang="less" scoped>
    .my_line {
        width: 100%;
        height: 440px;
        margin-top: 10px;
        background: url("../../../../static/imgs/noData.png") no-repeat center;
    }
    @media only screen and (max-width: 1366px){
       .my_line {
            height: 340px;
        }     
    }
</style>

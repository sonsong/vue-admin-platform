<template>
    <div class="barTrend" :ref="comm_values.ref" v-loading="loading" element-loading-text="努力加载中"/>
</template>
<script>
    const echarts = require("echarts/lib/echarts");
    require("echarts/lib/chart/bar");
    require("echarts/lib/component/tooltip");
    require("echarts/lib/component/legend");

    /**
     * const echartValus = {
            yData: [powerData], //y轴数据
            xData: xDate, //x轴数据
            xunit: "量/元", //y轴单位
            colors: ["#bb4b39"], 颜色盘
            legend: ["领取量"] 提示信息
        };
     */
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
             * 绘制bar图
             *  data：x轴数据
             */
            drawBarTrend(data = [0,0,0,0,0,0,0], noData = true, loading = false) {
                const that = this;

                const ref = that.$refs[that.comm_values.ref];

                const barTrend = echarts.init(ref);
                barTrend.clear();
                
                this.loading = loading;

                if(noData){
                    barTrend.dispose();
                    ref.style.background = "";
                    return;
                }

                ref.style.background = "transparent";

                const option = {
                    tooltip: {
                        trigger: "axis",
                        axisPointer: {
                                type: "shadow"
                        },
                        formatter: "{a}<br/>" + "{c}"
                    },
                    legend: {
                        data: [{name:that.comm_values.legend[0], icon:'circle'}],
                        bottom: 15
                    },
                    grid: {
                        bottom: "10%",
                        top: "5%",
                        left:"4%",
                        right:"4%",
                        containLabel: true
                    },
                    xAxis: {
                        name:that.comm_values.xunit,
                        type: "value",
                        axisLine: {
                            lineStyle: {
                                color: "rgba(0, 0, 0, 0.3)"
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: "category",
                        axisLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                        splitLine: { show: false },
                        data:that.comm_values.yData
                    },
                    series: [
                        {
                            name: that.comm_values.legend[0],
                            type: "bar",
                            barWidth: "70%",
                            color: that.comm_values.colors,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: "{b}",
                                    position: "right",
                                    color: "rgba(0, 0, 0, 0.4)"
                                }
                            },
                            data: data
                        }
                    ]
                };
                barTrend.resize();
                barTrend.setOption(option);
            }
        }
    };
</script>
<style lang="less" scoped>
    .barTrend {
        width: 100%;
        height: 490px;
        margin-top: 10px;
        background: url("../../../../static/imgs/noData.png") no-repeat center;
    }
    @media only screen and (max-width: 1366px){
       .barTrend {
            height: 390px;
        }     
    }
</style>

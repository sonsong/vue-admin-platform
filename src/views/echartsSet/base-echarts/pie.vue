<template>
    <div class="my_pie" :ref="comm_values.ref" v-loading="loading" element-loading-text="努力加载中"/>
</template>
<script>
    const echarts = require("echarts/lib/echarts");
    require("echarts/lib/chart/pie");
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
                loading:true,
                per : []
            };
        },
        methods: {
            /**
             * 绘制pie图
             *  data：x轴数据 
             */
            drawPieGraphics(data = [0,0,0,0,0,0,0], noData = true, loading = true) {

                const that = this;

                const ref = that.$refs[that.comm_values.ref];

                const pie = echarts.init(ref);

                pie.clear();
                
                this.loading = loading;

                if(noData){
                    pie.dispose();
                    ref.style.background = "";
                    return;
                }

                ref.style.background = "transparent";
                let i = 0;


                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter(params){
                            return params.name + "<br/>" +  params.percent + "%";
                        }
                    },
                    grid:{
                        x:135,
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'center',
                        y:"center",
                        left:"75%",
                        itemGap:25,
                        formatter(name){
                            return name + "    " + that.per[i++] + "%";
                        },
                        textStyle:{
                            fontSize:16,
                        },
                        data:[
                                {name:that.comm_values.legend[0], icon:"circle"},
                                {name:that.comm_values.legend[1], icon:"circle"},
                                {name:that.comm_values.legend[2], icon:"circle"},
                                {name:that.comm_values.legend[3], icon:"circle"},
                                {name:that.comm_values.legend[4], icon:"circle"}
                        ]
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            color:that.comm_values.colors,
                            selectedOffset:5,
                            radius: ['45%', '70%'],
                            label: {
                                normal: {
                                    show: false,
                                    position: 'inside',
                                    formatter(params){
                                        that.per.push(params.percent);
                                        return 
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            itemStyle:{
                                borderWidth:5,
                                borderColor:"#f0f3f9",
                            },
                            hoverAnimation:false,
                            data
                        }
                    ]
                };

                pie.resize();
                pie.setOption(option);
            }
        }
    };
</script>
<style lang="less" scoped>
    .my_pie {
        width: 100%;
        height: 440px;
        margin-top: 10px;
        background: url("../../../../static/imgs/noData.png") no-repeat center;
    }
    @media only screen and (max-width: 1366px){
       .my_pie {
            height: 340px;
        }     
    }
</style>

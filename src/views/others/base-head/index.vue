//标题组件
<template>
    <div class="base-head-wrap">
        <div class="bHead-title">{{getCurHeadTitle}}</div>
        <base-bar :barsName="barsName" @barSelected="barSelected"/>
        <div class="bHead-row">
            <div>时间维度:</div>
            <base-btn-group/>
        </div>
        <div class="bHead-row">
            <div>选择时间:</div>
            <base-date-picker 
                @changeDateHandle="changeDateHandle"
                :date="date"
            />
        </div>
        <div class="bHead-row">
            <div>选择月份:</div>
            <base-month-picker 
                @changeMonthHandle="changeMonthHandle"
                :month="month"
            />
        </div>
        <div class="bHead-row">
            <div>选择年份:</div>
            <base-year-picker 
                @changeYearHandle="changeYearHandle"
                :year="year"
            />
        </div>
    </div>
</template>
<script>
    import baseBar from '../base-bar/index';
    import baseDatePicker from '../base-date-picker/date';
    import baseMonthPicker from '../base-date-picker/month';
    import baseYearPicker from '../base-date-picker/year';
    import baseBtnGroup from '../base-btn-group/index';

    export default {
        props:{
            barsName:{
                type: Array,
                require: true
            },
            date:{
                type: [Date, Number, String],
                default: new Date() - 24 * 3600 * 1000
            },
            month:{
                type: [Date, Number, String],
                default: new Date() - 24 * 3600 * 1000
            },
            year:{
                type: [Date, Number, String],
                default: new Date() - 24 * 3600 * 1000
            }
        },
        components:{
            baseBar,
            baseDatePicker,
            baseMonthPicker,
            baseYearPicker,
            baseBtnGroup
        },
        data(){
            return {}
        },
        computed:{
            getCurHeadTitle(){
                return this.$route.meta.title;
            }
        },
        methods:{
            barSelected(type){
                this.$emit("barSelected", type);
            },
            changeDateHandle(date){
                this.$emit("changeDateHandle", date);
            },
            changeMonthHandle(month){
                this.$emit("changeMonthHandle", month);
            },
            changeYearHandle(year){
                this.$emit("changeYearHandle", year);
            }
        }
    }
</script>
<style lang="less" scoped>
    .base-head-wrap{
        width: 100%;
        background: #fff;
        border-radius: 5px;
        .bHead-title{
            height: 50px;
            line-height: 50px;
            font-size: 1.6rem;
            margin-left: 20px; 
            border-bottom: 1px solid #e9e9e9;
        }
        .bHead-row{
            display: flex;
            height: 50px;
            line-height:50px;
            margin-left: 40px;
            div:first-child{
                margin-right: 10px;
            }
        }
    }
</style>

<template>
    <div class="others-wrap">
        <base-head 
            @barSelected="barSelected"
            @changeDateHandle="changeDateHandle"
            @changeMonthHandle="changeMonthHandle"
            @changeYearHandle="changeYearHandle"
            :date="currDate"
            :month="currMonth"
            :year="currYear"
            :barsName="barsName"
        />
    </div>
</template>
<script>
    import DateUtils from 'utils/dateFormat';
    import baseHead from './base-head/index';

    export default {
        components:{
            baseHead
        },
        data(){
            return {
                selected_head_type: "realDatas",
                currDate: new Date() - 24 * 3600 * 1000,
                currMonth: new Date() - 24 * 3600 * 1000,
                currYear: new Date() - 24 * 3600 * 1000,
                barsName: [
                    {
                        title: "实时数据",
                        type: "realDatas",
                        active: true
                    },
                    {
                        title: "历史数据",
                        type: "historyDatas",
                        active: false
                    }
                ]
            }
        },
        methods:{
            barSelected(type){
                this.selected_head_type = type;
                console.log(this.selected_head_type);
            },
            changeDateHandle(date){
                this.currDate = date;
                console.log(this.currDate);
            },
            changeMonthHandle(month){
                this.currMonth = month;
                console.log(this.currMonth);
            },
            changeYearHandle(year){
                
                this.currYear = year;
                console.log(this.currYear);
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

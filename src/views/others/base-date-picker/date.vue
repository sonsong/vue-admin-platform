//时间选择器
<template>
    <div class="data-picker-wrap">
        <el-date-picker
            v-model="currDate"
            type="date"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            :default-value="defaultValue"
            placeholder="请选择日期"
        />
    </div>
</template>
<script>
    import DateUtils from 'utils/dateFormat';

    export default {
        props: {
            date:{
                type: [Date, Number, String],
                default: new Date() - 24 * 3600 * 1000
            }
        },
        data() {
            return {
                //当前时间
                currDate: this.date,
                //默认值
                defaultValue: this.date,
                pickerOptions: {
                    //设置可选范围
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 24 * 3600 * 1000;
                    }
                }
            };
        },
        watch:{
            currDate(val){
                if(val !== null){
                    this.$emit("changeDateHandle", DateUtils.format(val, "yyyy-MM-dd"));
                }
            }
        },
        methods: {
        }
    };
</script>
<style lang="less">
    .el-date-editor.el-input, .el-date-editor.el-input__inner{
        width: 140px;
    }
    .el-input__inner{
        height: 30px;
        line-height: 30px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .el-input__icon{
        height: 37px;
        line-height: 37px;
    }
    .el-date-table td.today span{
        color: #c0c4cc
    }
</style>

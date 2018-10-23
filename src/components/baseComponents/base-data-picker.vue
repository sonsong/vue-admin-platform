//时间选择器
<template>
    <div class="data-picker">
    <el-date-picker
      v-model="time"
      type="date"
      format="yyyy-MM-dd"
	  :picker-options="pickerOptions"
	  :default-value="defaultValue"
	  :change="changeHandle()"
      placeholder="请选择日期"
    />
  </div>
</template>
<script>
export default {
  props: {
    date: {
      type: Date,
      required: true
    },
    watchDateChangeHandle: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      //当前时间
      time: this.date,
      //默认值
      defaultValue: this.date,
      pickerOptions: {
        //设置可选范围
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    changeHandle() {
      this.watchDateChangeHandle(this.time);
    }
  }
};
</script>
<style lang="less">
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 165px;
}
.el-input__inner{
  height: 37px;
  line-height: 36px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}
.el-input__icon{
  height: 37px;
  line-height: 37px;
}
/* .el-icon-date{
  box-sizing: border-box;
  width: 165px;
  text-align: right;
  padding:0px 40px 0px 0px; 
  font-size: 1.6rem;
} */
</style>

/**
 * 时间格式化工具
 */
const DataUtils = {
  format(data, format) {
    let date = {
      "YYYY+": data.getFullYear(),
      "MM+": data.getMonth() + 1,
      "dd+": data.getDate(),
      "h+": data.getHours(),
      "m+": data.getMinutes(),
      "s+": data.getSeconds(),
      "q+": Math.floor((data.getMonth() + 3) / 3),
      "S+": data.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(
        RegExp.$1,
        (data.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ?
          date[k] :
          ("00" + date[k]).substr(("" + date[k]).length)
        );
      }
    }
    return format;
  }

}

export default DataUtils

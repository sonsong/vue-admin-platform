import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index.js';

//阿里矢量图标
import icon from 'assets/icon/iconfont.js'

//表单校验
import veeValidate from 'vee-validate'

//vuex
import store from './vuex/store.js';

//控制权限的相关代码
import '@/router/auth.js';

//国际化相关
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(ElementUI, icon, veeValidate);
Vue.use(ElementUI, {locale});

//图标组件，传入图标名字即可
import baseIcon from 'components/base-components/base-icon.vue'
//时间选择器
import timePicker from 'components/base-components/base-data-picker.vue'
Vue.component("base-icon", baseIcon);
Vue.component("base-time-picker", timePicker);

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

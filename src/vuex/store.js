import Vue from 'vue';
import Vuex from 'vuex';
import is_collapse from './module/isCollapse.js';
import login from './module/login.js';
import permission from './module/permission.js';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    is_collapse,
    login,
    permission
  }
});

export default store;

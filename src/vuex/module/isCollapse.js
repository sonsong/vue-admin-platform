/**
 * 控制侧边栏开关状态
 */
import {CHANGE_STATE} from './const/mutationConsts.js';

const is_collapse = {
  state: {
    isCollapse: false
  },
  mutations: {
    [CHANGE_STATE](state, bool) {
      state.isCollapse = bool;
    }
  },
  actions: {
    changeState({commit}, bool) {
      commit('CHANGESTATE', bool);
    }
  },
  getters:{
    getState : state => state.isCollapse
  }
}

export default is_collapse;

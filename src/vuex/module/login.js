import loginApi from '@/api/login.js';
import {
  SET_TOKEN,
  EXIT_LOGIN,
  SET_ROLES,
  SET_NAME
} from './const/mutationConsts.js';
import sessionApi from '@/utils/session.js';

/**
 * 用户登陆
 */
const loginInfo = {
  state: {
    user: {
      name: "",
      token: sessionApi.getToken(),
      roles: []
    }
  },
  actions: {
    /**
     * 前端注销
     */
    loginOut({
      commit
    }) {
      sessionApi.clearToken();
      sessionApi.setToken("");
      commit("EXITLOGIN");
    },
    /**
     * 注销
     */
    exitLogin({
      commit
    }) {
      return new Promise((resolve, reject) => {
        loginApi.exitLogin().then(res => {
          sessionApi.clearToken();
          sessionApi.setToken("");
          commit("EXITLOGIN")
          resolve(res)
        }).catch(e => {
          reject("ERROR!!!!");
        })
      })
    },
    /**
     * 获取用户信息
     */
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        loginApi.getUserInfo(state.user.token, sessionStorage.getItem("username")).then(res => {
          commit("SETNAME", res.data.name);
          commit("SETROLES", res.data.roles);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      })
    },
    /**
     * 用户登陆
     * @param {Object} loginForm 用户名和密码
     */
    userLoginByLoginForm({
      commit
    }, loginForm) {
      return new Promise((resolve, reject) => {
        loginApi.loginByLoginForm(loginForm).then(res => {

          //将token存储到session中
          sessionApi.setToken(res.token);
          //f5刷新vuex状态会丢，暂时解决方案
          sessionStorage.setItem("username", loginForm.username);

          commit("SETTOKEN", res.token);
          commit("SETNAME", loginForm.username);
          resolve();
        }).catch(e => {
          reject(e);
        })
      })
    }
  },
  mutations: {
    [EXIT_LOGIN](state) {
      state.user.name = "";
      state.user.roles = [];
      state.user.token = "";
    },
    [SET_ROLES](state, roles) {
      state.user.roles = roles;
    },
    [SET_NAME](state, name) {
      state.user.name = name;
    },
    [SET_TOKEN](state, token) {
      state.user.token = token;
    }
  },
  getters: {
    getUserName: state => state.user.name,
    getUserRoles: state => state.user.roles,
  }
}

export default loginInfo;

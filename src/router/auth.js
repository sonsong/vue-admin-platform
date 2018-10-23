import {
  Message
} from 'element-ui';
import router from './index.js';
import sessionApi from '@/utils/session.js';
import store from '@/vuex/store.js';

/**
 * 访问任何页面前做token校验
 *  to : 想跳转的路由
 *  from ：想离开的路由
 *  next : 释放钩子 
 */
const whiteList = ["/login"];
router.beforeEach((to, from, next) => {
  if (sessionApi.getToken()) {
    //如果访问的是白名单中的某一个
    if (to.path === "/login") {
      next({
        path: "/"
      })
    } else {
      if (store.getters.getUserRoles.length === 0) {
        //获取用户相关信息
        store.dispatch("getUserInfo").then(res => {
          //动态分配路由
          let roles = res.data.roles;
          store.dispatch("generateRoutes", roles).then(res => {
            //往当前路由器中添加权限路由，不添加将无法访问
            router.addRoutes(store.getters.getAddRouters);
            //处理刷新权限路由无法显示问题
            next({ ...to,
              replace: true
            });
          }).catch(e => {
            console.log(e);
          })
        }).catch(() => {
          //清空session信息
          store.dispatch("loginOut").then(res => {
            Message({
              showClose: true,
              message: "获取用户信息失败，请重新登陆",
              type: "error"
            });
            next({
              path: "/login"
            })
          })
        })
      } else {
        next();
      }
    }
  } else {
    //没有登陆
    //如果当前访问的页面是不需要权限的，直接放行
    if (whiteList.toString().indexOf(to.path) != -1) {
      next();
    } else {
      Message({
        showClose: true,
        message: "请先登陆！",
        type: "error"
      });
      next({
        path: "/login"
      });
    }
  }
})

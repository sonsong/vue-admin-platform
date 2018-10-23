import {asyncRouter, constantRouter} from '@/router/index.js';

/**
 * 权限匹配
 * @param {*} roles 当前用户具有的权限
 * @param {*} route 当前路由
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //判断当前用户具有的权限是否存在当前路由中
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

const permission = {
  state: {
    routers: constantRouter,
    addRouters: []
  },
  actions: {
    //roles 登陆用户具有的权限
    generateRoutes({commit}, roles) {
      return new Promise(resolve => {
        const accessedRouters = asyncRouter.filter(v => {
          //如果是管理员权限。直接放行
          if (roles.indexOf('admin') >= 0) return true;
          
          if (hasPermission(roles, v)) {

            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return true
                }
                return false;
              });
              return true;
            } 
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      })
    }
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouter.concat(routers);
    }
  },
  getters: {
    getAddRouters: state => state.addRouters,
    getRouters: state => state.routers.filter(e => !e.hidden)
  }
}

export default permission;

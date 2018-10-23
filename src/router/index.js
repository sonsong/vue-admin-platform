import Vue from "vue";
import Router from "vue-router";

/**
 * 导入所有的组件 懒加载
 */
const layout = resolve => require(['@/components/layout/index.vue'], resolve);
const index = resolve => require(['@/views/index/index.vue'], resolve);
const todoList = resolve => require(['@/views/todoList/index.vue'], resolve);
const login = resolve => require(['@/views/login/index.vue'], resolve);
const adminAuth = resolve => require(['@/views/permission/adminAuth.vue'], resolve);
const manageAuth = resolve => require(['@/views/permission/manageAuth.vue'], resolve);
const spareParts = resolve => require(['@/views/deviceControll/spareParts/index.vue'], resolve);
const echarts = resolve => require(['@/views/echartsSet/index.vue'], resolve);
const FatherAndSon = resolve => require(['@/views/fatherAndSon/index.vue'], resolve);


Vue.use(Router);

/**
 *  name:必须写
 *  hidden：false => 表示隐藏该路由, 不会显示在侧边栏
 *  single: true => 表示该路由不是子路由 
 * 
 */


//不需要权限访问的路由
export const constantRouter = [{
    path: "/login",
    name: "login",
    hidden: true,
    component: login
  },
  {
    path: "/",
    name: "Layout",
    component: layout,
    redirect: "/index",
    hidden: true,
    children: [{
      path: "/index",
      component: index,
    }]
  },
  {
    path: "/deviceControll",
    name: "deviceControll",
    component: layout,
    redirect: "/deviceControll/spareParts",
    meta: {
      title: "设备监控",
      icon: "setList",
    },
    children: [{
      path: "spareParts",
      name: "spareParts",
      component: spareParts,
      meta: {
        title: "备品备件",
        icon: "userSet"
      }
    }]
  },
  {
    path: "/EchartsSet",
    component: layout,
    single: true,
    children: [{
      path: "echarts",
      name: "echarts",
      component: echarts,
      meta: {
        title: "Echarts图集",
        icon: "category"
      }
    }]
  },
  {
    path: "/fatherAndSon",
    component: layout,
    single: true,
    children: [{
      path: "params",
      name: "params",
      component: FatherAndSon,
      meta: {
        title: "父子组件传参问题",
        icon: "category"
      }
    }]
  },
]
/**
 * 需要权限的路由，将会在路由的前置全局守卫中动态添加到路由器中
 */
export const asyncRouter = [
	{
		path: "/permission",
		name: "permission",
		component: layout,
		redirect: "/permission/adminAuth",
		meta: {
			title: "权限",
			icon: "setList",
			roles: ["admin", "manage"]
		},
		children: [{
			path: "adminAuth",
			name: "adminAuth",
			component: adminAuth,
			meta: {
				title: "超级管理员权限",
				icon: "userSet",
				roles: ["admin"]
			}
		},
		{
			path: "manageAuth",
			name: "manageAuth",
			component: manageAuth,
			meta: {
					title: "管理员权限 ",
					icon: "setup",
					roles: ["admin", "manage"]
				}
		}]
	},
	{
		path: "/todoList",
		component: layout,
		single: true,
		meta:{
			roles:["test"]
		},
		children: [
			{
				path: "todoList",
				name: "todoList",
				component: todoList,
				meta: {
					title: "todoList",
					icon: "category",
					roles:["test"],
				}
			}
		]
	}
]


export default new Router({
  mode: "history",
  routes: constantRouter
})

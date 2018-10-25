import Vue from "vue";
import Router from "vue-router";

/**
 * 导入所有的组件 懒加载
 */
const layout = resolve => require(['@/components/layout/index.vue'], resolve);
const index = resolve => require(['views/index/index.vue'], resolve);
const login = resolve => require(['views/login/index.vue'], resolve);
const adminAuth = resolve => require(['views/permission/adminAuth.vue'], resolve);
const manageAuth = resolve => require(['views/permission/manageAuth.vue'], resolve);
const tables = resolve => require(['views/tables/index.vue'], resolve);
const echarts = resolve => require(['views/echartsSet/index.vue'], resolve);
const others = resolve => require(['views/others/index.vue'], resolve);

Vue.use(Router);

/**
 *  name:必须写
 *  hidden：false => 表示隐藏该路由, 不会显示在侧边栏
 *  single: true => 表示该路由不是子路由 
 * 
 */


//不需要权限访问的路由
export const constantRouter = [
    {
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
        children: [
            {
                path: "/index",
                component: index,
            }
        ]
    },
    {
        path: "/tables",
        component: layout,
        single: true,
        children: [
            {
                path: "index",
                name: "tables",
                component: tables,
                meta: {
                    title: "tables组件",
                    icon: "category"
                }
            }
        ]
    },
    {
        path: "/EchartsSet",
        component: layout,
        single: true,
        children: [
            {
                path: "index",
                name: "echarts",
                component: echarts,
                meta: {
                    title: "Echarts图集",
                    icon: "category"
                }
            }
        ]
    },
    {
        path: "/others",
        component: layout,
        single: true,
        children: [
            {
                path: "index",
                name: "others",
                component: others,
                meta: {
                    title: "其它组件",
                    icon: "category"
                }
            }
        ]
    }
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
	}
]


export default new Router({
  mode: "history",
  routes: constantRouter
})

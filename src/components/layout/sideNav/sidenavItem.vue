<template>
    <div>
        <template v-for="(route, i) in routes">
            
            <template v-if="route.children && route.children.length === 1 && route.single">
                <el-menu-item :index="route.path + ( '/' + route.children[0].name) || route.children[0].path" :key="i">
                    <base-icon :iconName="route.children[0].meta.icon"/> 
                    <span slot="title">{{ route.children[0].meta.title }}</span>
                </el-menu-item>
            </template>

            <template v-else>
                <el-submenu :index="('/' + route.name) || route.path" :key="i">
                    <template slot="title">
                        <base-icon :iconName="route.meta.icon"/>
                        <span slot="title">{{route.meta.title}}</span> 
                    </template>
                    <el-menu-item v-for="(item, k) in route.children" :index="(route.path + ('/' + item.name) || item.path)" :key="k">
                        <base-icon :iconName="item.meta.icon"/>
                        <span>{{item.meta.title}}</span>
                    </el-menu-item>
                </el-submenu>
            </template>
            
        </template>
    </div>
</template>
<script>
    import elNav from './sidenavItem';

    export default {
        props: {
            routes: {
                type: Array,
                required: true
            }
        },
        components:{
            elNav
        }
    };
</script>

<template>
    <div class="son_wrap">
        <div v-for="(item, index) in datas" :key="index">{{item}}</div>
    </div>
</template>
<script>
    export default {
        props:{
            datas:{
                type:Array,
                required:true
            }
        },
        beforeCreate() {
            console.log("beforeCreate");
        },
        created() {
            console.log("created");
        },
        beforeMount() {
            console.log("beforeMount:", this.datas);
        },
        mounted() {
            console.log("mounted:", this.datas);

        },
        beforeUpdate() {
            console.log("beforeUpdate:", this.datas);
        },
        updated() {
            console.log("updated:", this.datas);
        },
        beforeDestroy() {
            console.log("beforeDestroy:",this.datas);
        },
        destroyed() {
            console.log("destroyed:", this.datas);
        }
    }
</script>

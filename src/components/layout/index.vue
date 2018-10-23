<template>
    <div class="wrap">
        <!-- <el-header/> -->
        <div class="container">
            <el-nav :id="getState ? 'nav_animationClose' : 'nav_animationOpen' "/>
            <div class="main" :id="getState ? 'main_animationClose' : 'main_animationOpen' ">
                <el-bar/>
                <el-content/>
                <!-- <el-footer/> -->
            </div>
        </div>
    </div>
</template>
<script>
import elHeader from "./header";
import elNav from "./sideNav/nav.vue";
import elBar from "./bar";
import elContent from "./content.vue";
import elFooter from "./footer.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    elHeader,
    elNav,
    elBar,
    elContent,
    elFooter
  },
  data(){
      return {
          windWidth:1920
      }
  },
  computed: {
    ...mapGetters(["getState"]),
  },
  watch:{
    windWidth(value){
        if(value <= 1366){
            this.$store.dispatch("changeState", true);
        }else{
            this.$store.dispatch("changeState", false);
        }
    }
  },
  mounted() {
    window.addEventListener("resize", ()=>{
        this.windWidth = document.body.offsetWidth;
    })
  }
};
</script>



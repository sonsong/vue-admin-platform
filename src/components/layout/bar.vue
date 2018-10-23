<template>
    <div class="bar">
		<div class="left-bar">
			<div class="barIcon" :id="getState ? 'transformClose' : '' " aria-hidden="true" @click="changeState">
				<base-icon iconName="threeLine"/>
			</div>
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<template v-for="(path, index) in getPath">
					<el-breadcrumb-item :to="{ path: '/index' }" v-if="index == 0" :key="index">{{path}}</el-breadcrumb-item>
					<el-breadcrumb-item :key="index" v-else>{{path}}</el-breadcrumb-item>
				</template>
			</el-breadcrumb>
		</div>
		<div class="right-bar">
			<div class="amplification" @click="fullScreen">
				<base-icon iconName="amplification"/>
			</div>		
			<div class="user">
				<img class="userlogo" src="./../../assets/imgs/user.gif" alt="">
				<el-dropdown>
					<span class="el-dropdown-link">
						<span>{{getUserName}}</span>
						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>                                                              
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="exitLogin()">注销</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import fullScreen from "./../../utils/fullScreen.js";
export default {
  data() {
    return {
      flag: true
    };
  },
  computed: {
    ...mapGetters(["getState", "getUserName"]),
    getPath() {
      let _fullPath = this.$route.fullPath;

      let path = "首页";
      if (_fullPath === "/index") {
        return [path];
      }
      return `${path}/${this.$route.meta.title}`.split("/");
    }
  },
  methods: {
    changeState(){
      this.$store.dispatch("changeState", !this.getState);
    },
    //退出登陆
    exitLogin() {
      this.$store
        .dispatch("exitLogin")
        .then(() => {
          this.$router.push("/login");
          this.$message({
            showClose: true,
            message: "注销成功",
            type: "success"
          });
        })
        .catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: "error"
          });
          return;
        });
    },
    //全屏功能
    fullScreen() {
      if (this.flag) {
        fullScreen.pushFullScreen(this.flag);
        this.flag = false;
      } else {
        fullScreen.exitFullScreen(this.flag);
        this.flag = true;
      }
    }
  }
};
</script>
<style>
.bar .left-bar {
  width: 50%;
  height: 100%;
  display: flex;
}
.bar .right-bar {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
}
.bar .barIcon {
  transition: 0.5s;
  line-height: 50px;
  box-sizing: content-box;
  padding-left: 16px;
  font-weight: 900;
}
.bar #transformClose > .icon {
  transform: rotate(90deg);
  transform-origin: center;
}
.user {
  display: flex;
  width: 18%;
}
.user .userlogo {
  width: 30%;
  margin-right: 13px;
  border-radius: 50%;
  height: 40px;
  margin-top: 2px;
}
.amplification {
  width: 5%;
  text-align: center;
  line-height: 50px;
}
.amplification:hover {
  cursor: pointer;
}
@media only screen and (max-width: 1366px) {
  .user {
    width: 15%;
  }
}
</style>

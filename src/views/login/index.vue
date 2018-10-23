<template>
  <div class="login-container">

    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" status-icon>
      
      <h3 class="title">系统登陆</h3>

      <el-form-item prop="username">
        <base-icon iconName="user" class="login-user-icon"/>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
      </el-form-item>

      <el-form-item prop="password">
        <base-icon iconName="passwd" class="login-passwd-icon"/>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
        placeholder="password"/>
        <span class="show-pwd" @click="showPwd()" v-if="pwdType == 'password'">
          <base-icon iconName="closeEye"/>          
        </span>
        <span class="show-pwd" @click="showPwd()" v-else>
          <base-icon iconName="openEye"/>          
        </span>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;margin-top:14px" @click.native.prevent="handleLogin">
          登陆
        </el-button>
      </el-form-item>

      <div class="tips">
        <span>username: admin</span>
        <span> password: admin</span>
      </div>

    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      pwdType: "password"
    };
  },
  methods: {
    handleLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          this.$store
            .dispatch("userLoginByLoginForm", this.loginForm)
            .then(() => {
              this.$router.push("/");
            })
            .catch(e => {
              this.$message({
                showClose: true,
                message: e,
                type: "error"
              });
              return;
            });
        } else {
          this.$message({
            showClose: true,
            message: "请输入用户名或密码",
            type: "error"
          });
          return false;
        }
      });
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "text";
      } else {
        this.pwdType = "password";
      }
    }
  }
};
</script>

<style>
.login-container {
  widows: 100%;
  height: 100%;
  background-color: #2d3a4b;
}
.login-container .login-form {
  width: 520px;
  height: 520px;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0;
  margin: auto;
}
.login-container .login-form .title {
  color: #fff;
  font-size: 3rem;
  font-weight: bold;
  line-height: 100px;
  text-align: center;
}
.el-form-item__content {
  line-height: 0px;
  height: 68px;
}
.el-input__inner {
  padding: 25px 50px;
}
.login-user-icon {
  position: relative;
  top: 34px;
  left: 18px;
  font-size: 1.6rem;
  z-index: 1;
}
.login-passwd-icon {
  position: relative;
  top: 34px;
  left: 18px;
  font-size: 1.6rem;
  z-index: 1;
}
.show-pwd {
  position: relative;
  bottom: 33px;
  right: -470px;
  font-size: 1.6rem;
  z-index: 1;
}
.tips {
  color: #fff;
  font-size: 1.6rem;
  line-height: 2rem;
  margin-top: -26px;
}
.el-form-item__error {
  font-size: 1.6rem;
}
@media only screen and (max-width: 1366px) {
  .login-container .login-form {
    width: 420px;
    height: 420px;
  }
}
</style>

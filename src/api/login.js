import randomWord from '@/utils/random.js';

const userInfos = [{
    uname: "admin",
    passwd: "admin",
    roles: ["admin"]
  },
  {
    uname: "huangss",
    passwd: "123456",
    roles: ["manage"]
  },
  {
    uname: "xiaoming",
    passwd: "123456",
    roles: ["user"]
  }
];
/**
 * 登陆相关api
 */
const loginApi = {
  /**
   * 退出登陆
   */
  exitLogin() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("退出成功");
      }, 1000)
    })
  },
  /**
   * 获取用户信息
   */
  getUserInfo(token, name) {
    return new Promise((resolve, reject) => {
      //简单代替后台逻辑, 先检验用户是否登陆
      if (token) {
        setTimeout(() => {
          //返回用户信息
          let user = userInfos.filter(el => el.uname === name);
          if (user.length === 0) {
            reject("用户名不存在");
          } else {
            user = user[0];
            let res = {
              data: {
                name: user.uname,
                roles: user.roles
              }
            }
            resolve(res);
          }
        }, 100)
      } else {
        reject("请先登录！！！！")
      }
    })
  },
  /**
   * 用户登陆
   * @param {Object} loginForm 用户名和密码
   */
  loginByLoginForm(loginForm) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = userInfos.filter(el => el.uname === loginForm.username);
        if (user.length === 0) {
          reject("用户名不存在");
        } else {
          user = user[0];
          if (loginForm.password === user.passwd) {
            let res = {
              token: randomWord(false, 128)
            }
            resolve(res);
          } else {
            reject("密码错误");
          }
        }
      }, 100);
    })
  }
}

export default loginApi;

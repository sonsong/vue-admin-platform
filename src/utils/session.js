/**
 * 将token存储到session中
 */

const sessionApi = {
  //存
  setToken(token) {
    sessionStorage.setItem("token", token);
  },
  //取
  getToken() {
    return sessionStorage.getItem("token");
  },
  //清除
  clearToken() {
    sessionStorage.removeItem("token");
  }
}

export default sessionApi;

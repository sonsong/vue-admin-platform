const fullScreen = {
  //全屏
  pushFullScreen(flag) {
    let docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      //FireFox
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      //Chrome等
      docElm.webkitRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
      //IE11
      elem.msRequestFullscreen();
    }
  },
  //退出全屏
  exitFullScreen(flag) {
    //W3C
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      //FireFox
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      //Chrome等
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      //IE11
      document.msExitFullscreen();
    }
  }
}

export default fullScreen;

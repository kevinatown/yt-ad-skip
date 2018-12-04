class YtWatch {
  constructor() {
    this.vidWrapper = document.getElementById('movie_player');
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const classes = mutation.target.className.split(' ');
          const hasInteruptAd = classes.indexOf('ad-interrupting');
          if (hasInteruptAd >= 0) {
            const vidEle = this.vidWrapper.getElementsByTagName('video')[0];
            vidEle.currentTime = vidEle.duration;
          }
        }
      });
    });
  }

  start() {
    this.observer.observe(this.vidWrapper, {
      attributes: true
    });
  }
}

window.ytskip = new YtWatch();
window.ytskip.start();

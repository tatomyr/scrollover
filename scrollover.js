/**
 * Scrolling over the whole [data-scrollover]
 */

const scrollover = (scrolloverTime) => {
  console.log('set scrollover to:', $('[data-scrollover]'), 'with time:', scrolloverTime);

  $('[data-scrollover]').on('wheel', (event) => {
    // console.log(event);
    if (this.animationInProgress) {
      // It's very important to avoid shaking:
      event.preventDefault();
    } else {
      this.animationInProgress = true;

      const t = $(event.currentTarget).offset().top,
        T = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0, // Polyfill
        h = $(event.currentTarget).height(),
        H = window.innerHeight,
        dY = event.originalEvent.deltaY; // Vanilla.js: event.deltaY, jQuery: event.originalEvent.deltaY
      console.log(`t: ${t}, T: ${T} | h: ${h}, H: ${H} | dY: ${dY}`);

      var scrollTop = undefined;
      if (dY > 0) {
        if (t > T) {
          scrollTop = t;
        } else if (h === H) {
          scrollTop = t + H;
        } else if (T + H >= t + h) {
          scrollTop = t + h;
        } else {
          // Manually
        }
      } else {
        if (t >= T) {
          scrollTop = t - H;
        } else if (h === H) {
          scrollTop = t;
        } else {
          // Manually
        }
      }
      console.log('scrollTop:', scrollTop);

      if (scrollTop >= 0 && scrollTop <= document.body.clientHeight - H) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop
        }, scrolloverTime);
        setTimeout(() => {
          this.animationInProgress = false;
          console.log('end');
        }, scrolloverTime);
      } else {
        this.animationInProgress = false;
      }
    }

  });
}

const scrolloverTime = parseInt(document.currentScript.dataset.scrolloverTime) || 1000;

$(document).ready(() => {
  scrollover(scrolloverTime);
});

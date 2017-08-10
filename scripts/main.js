window.addEventListener('DOMContentLoaded', function() {
  if('ontouchstart' in window) {
    window.addEventListener('deviceorientation', function(event) {
      var x = 1 - clamp((event.gamma + 45) / 90);
      var y = event.beta;
      if(Math.abs(y) > 90) {
        y = 1 - (Math.abs(y) - 90) / 90;
      } else {
        y /= 90;
      }
      y = 1 - clamp(y);
      look(x, y);
    });
  } else {
    window.addEventListener('mousemove', function(event) {
      look(event.pageX / window.innerWidth, event.pageY / window.innerHeight);
    });
  }
  var dataset = document.querySelector('.glasses').dataset;
  function look(x, y) {
    dataset.column = quantile(x);
    dataset.row = quantile(y);
  }
  function quantile(coordinate) {
    return Math.min(4, Math.floor(coordinate * 5)) - 2;
  }
  function clamp(coordinate) {
    return Math.max(Math.min(coordinate, 1), 0);
  }
});

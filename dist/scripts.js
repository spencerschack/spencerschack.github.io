window.addEventListener('mousemove', function(event) {
  const glasses = document.querySelector('.glasses');
  glasses.dataset.column = quantile(event.pageX / window.innerWidth);
  glasses.dataset.row = quantile(event.pageY / window.innerHeight);
});
function quantile(x) {
  return Math.max(Math.min(Math.floor(x * 5), 4), 0) - 2;
}
//# sourceMappingURL=scripts.map

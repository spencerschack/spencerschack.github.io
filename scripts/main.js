export default function main() {
  window.addEventListener('mousemove', ({pageX, pageY}) => {
    const glasses = document.querySelector('.glasses');
    glasses.dataset.column = quantile(pageX / window.innerWidth);
    glasses.dataset.row = quantile(pageY / window.innerHeight);
  });
  function quantile(x) {
    return Math.max(Math.min(Math.floor(x * 5), 4), 0) - 2;
  }
}

var el = document.documentElement
document.write(
  'inline:' + el.style.width,
  'IE:' + el.currentStyle,
  el.getBoundingClientRect().width,
  window.getComputedStyle(el).width
)
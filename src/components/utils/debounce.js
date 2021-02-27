export function handleDebounce(fn, wait) {
  // 防抖
  var timer = null
  return function() {
    if(timer !== null){
      clearTimeout(timer)
    }
    timer = setTimeout(fn, wait)
  }
}

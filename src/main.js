import 'styles'
import 'scripts'

window.onload = function () {
  document.addEventListener('touchstart', (e) => {
    e.preventDefault()
  })

  const banners = document.querySelector('.banner')
  const indicators = document.querySelector('.indicator')

  const iLen = banners.children.length

  let disX = 0 // 点击开始时手指位置记录
  let oriLeft = 0 // 点击开始时元素位置记录
  let curLeft = 0 // 点击结束时目标位置

  let iWidth = document.documentElement.clientWidth

  let curIndex = 0 // 当前元素索引
  let oldIndex = 0 // 前一个元素索引

  // 扩展图片列表和容器宽度(无缝轮播关键点1)
  banners.innerHTML += banners.innerHTML
  banners.style.width = banners.offsetWidth * 2 + 'px'

  banners.addEventListener('touchstart', function (e) {
    disX = e.changedTouches[0].pageX
    this.style.transition = 'none'

    // 元素位置修正(无缝轮播关键点2)
    curIndex = Math.abs(this.offsetLeft / iWidth) % iLen
    if (curIndex === 0) {
      this.style.left = -this.offsetWidth / 2 + 'px'
    } else if (curIndex === iLen - 1) {
      this.style.left = -(iLen - 1) * iWidth + 'px'
    }
    oriLeft = this.offsetLeft
  })

  banners.addEventListener('touchmove', function (e) {
    curLeft = oriLeft + e.changedTouches[0].pageX - disX
    this.style.left = curLeft + 'px'
  })

  banners.addEventListener('touchend', function () {
    var iPos = Math.round((curLeft - oriLeft) / iWidth)
    curLeft = oriLeft + iPos * iWidth
    curIndex = Math.abs(curLeft / iWidth) % iLen
    this.style.left = curLeft + 'px'
    this.style.transition = '0.5s'

    indicators.children[oldIndex].className = ''
    indicators.children[curIndex].className = 'active'
    oldIndex = curIndex
  })
}

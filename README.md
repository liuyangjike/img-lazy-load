### img-lazy-load
图片懒加载的实现
### 原理
#### getBoundingClientRect
通过`getBoundingClientRect`可以获取`DOM`的位置, 再结合视图窗口判断是否在显示区域,
```js
_isInViewPort() {
  var {top, right} = this.img.getBoundingClientRect()
  var clientW = window.innerWidth || document.documentElement.clientWidth
  var clientH = window.innerHeight || document.documentElement.clientHeight
  if (top < clientH && right < clientW) {
    return true
  } else {
    return false
  }
}
```

#### 节流控制
因为要监听滚动事件`scroll`, 防止过多的触发
```js
document.addEventListener('scroll', this._throttle(this._updateImgPath.bind(this), 300), false)

_throttle (fn, delay) {
  var pre = Date.now()
  var that = this
  return function () {
    var now = Date.now()
    that._inViewBottom()
    if (now - pre > delay) {
      fn()
      pre = now
    }
  }
}
```
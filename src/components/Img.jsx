import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Img extends Component {
  static propTypes = {
    imgpath: PropTypes.string.isRequired,
  }
  constructor () {
    super()
    this.state = {img: null, path: null}
  }
  componentDidMount () {
    this._updateImgPath()
    document.addEventListener('scroll', this._throttle(this._updateImgPath.bind(this), 300), false)
  }
  /**
   * 是否要加载图片路径判断
   */
  _updateImgPath () {
    let path = this._isInViewPort()?this.props.imgpath:null
    this.setState({path})
  }
  /**
   * 滚动条到达底部
   */
  _inViewBottom () {
    var scrollTop = document.documentElement.scrollTop  //被滚动条隐藏高度
    var docHeight = document.documentElement.scrollHeight  // 文档总高 
    var clientH = window.innerHeight  // 窗口高度
    if (docHeight === clientH + scrollTop) {
      this.setState({path:this.props.imgpath})
    }
  }
  /**
   * 节流, 防止滚动事件过多的触发, 加载图片操作
   * @param {节流触发的函数} fn 
   * @param {节流的时间} delay 
   */
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
  /**
   * 判断图片是否在可视窗口内
   */
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
  render () {
    return (
      <div style={{width: "200px",height:"200px", background: '#eee',borderRadius: '3px'}} >
        <img src={this.state.path} style={{width: "200px",height:"200px",}} ref={(img) => this.img = img} alt=""/>
      </div>
    )
  }
}


export default Img
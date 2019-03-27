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
    document.addEventListener('scroll', (e) => {
      this._updateImgPath()
    }, false)
  }
  _updateImgPath () {
    let path = this._isInViewPort()?this.props.imgpath:null
    this.setState({path})
  }
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
      <div style={{width: "200px",height:"200px", background: '#ddd'}} >
        <img src={this.state.path} style={{width: "200px",height:"200px",}} ref={(img) => this.img = img} alt=""/>
      </div>
    )
  }
}


export default Img
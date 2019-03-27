import React, {Component} from 'react'
import {imglist} from './data'
import Img from './Img'

class LazyLoad extends Component {
  constructor () {
    super()
    this.state = {
      imgList: imglist
    }
  }
  render () {
    return (
      <div>
        {this.state.imgList.map((path, index) => {
          return <Img imgpath={path} key={index + path}/>
        })}
      </div>
    )
  }
}

export default LazyLoad
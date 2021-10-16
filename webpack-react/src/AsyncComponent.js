import React, {Component} from 'react'

export default class AsyncComponent extends Component {
  constructor () {
    super()
    this.state = {
      Comp: null
    }
  }
  componentWillMount () {
    this.props.load().then(res => { // load 执行获取到到是 promise，所以执行 then
      this.setState({
        Comp: res.default // res.default 返回到才是真正到组件
      })
    })
  }
  render () {
    let Comp = this.state.Comp
    return Comp ? <Comp></Comp> : <span>loading</span>
  }
}
import React, {Component} from 'react'
import ReactDom, {render} from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import AsyncComponent from './AsyncComponent'
import {a} from './methods'
import './index.css'
// export default class App extends Component {
//   constructor () { // constructor 注意拼写
//     super()
//   }
//   render () {
//     return (
//       <h1>hello world</h1>
//     )
//   }
// }

console.log(AsyncComponent)

{/* 注意：引用对象时用 {} */}
let Home = (props) => <AsyncComponent {...props} load={() => import('./Home')} />
let About = (props) => <AsyncComponent {...props} load={() => import('./About')} />

render(<Router>
  <div>
    <Route path="/home" component={Home} />
    <Route path="/about" component={About} />
  </div>
</Router>, window.root)
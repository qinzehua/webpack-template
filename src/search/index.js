import React from 'react'
import ReactDom from 'react-dom'
import _ from 'lodash'
import { Header } from './components/Header'
import '../asset/css/search.css'
import '../asset/css/search.less'
import '../test.qzh'

class Search extends React.Component {
  constructor() {
    super(...arguments)
    this.state = {
      Body: null
    }
    const a = _.chunk(['a', 'b', 'c', 'd'], 2)
    console.log(a)
  }

  loadComponent() {
    import(/* webpackChunkName: "Body" */ './components/Body.js').then(res => {
      this.setState({
        Body: res.Body
      })
    })
  }

  render() {
    /* eslint-disable react/jsx-no-bind */
    const { Body } = this.state
    return (
      <div className="search-text">
        <Header loadComponent={this.loadComponent.bind(this)} />
        {Body ? <Body /> : null}
      </div>
    )
  }
}

ReactDom.render(<Search />, document.getElementById('app'))

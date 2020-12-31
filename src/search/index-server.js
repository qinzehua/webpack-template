const React = require('react');
const { Header } = require('./components/Header.js');
const { Body } = require('./components/Body.js');

require('../asset/css/search.css');
require('../asset/css/search.less');

class Search extends React.Component {
  constructor() {
    super(...arguments);
  }

  loadComponent() {
    console.log('-----');
  }

  render() {
    return (
      <div className="search-text">
        <Header loadComponent={this.loadComponent} />
        <Body />
      </div>
    );
  }
}

module.exports = <Search />;

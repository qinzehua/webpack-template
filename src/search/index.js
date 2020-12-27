import React from "react";
import "../asset/css/search.css";
import "../asset/css/search.less";

import ReactDom from "react-dom";
import { Header } from "./components/Header.js";

// 这两个包，不能通过tree shaking 优化
import _ from "lodash";
import $ from "../utils/query";

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Body: null,
    };
  }
  loadComponent() {
    import(/* webpackChunkName: "Body" */ "./components/Body.js").then(
      (res) => {
        console.log(res);
        this.setState({
          Body: res.Body,
        });
      }
    );
  }
  render() {
    const { Body } = this.state;
    return (
      <div className="search-text">
        <Header loadComponent={this.loadComponent.bind(this)}></Header>
        {Body ? <Body /> : null}
      </div>
    );
  }
}

ReactDom.render(<Search></Search>, document.getElementById("app"));

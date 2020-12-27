import React from "react";
import ReactDom from "react-dom";
import { Header } from "./components/Header.js";
import { Body } from "./components/Body.js";
import "../asset/css/search.css";
import "../asset/css/search.less";

class Search extends React.Component {
  render() {
    return (
      <div className="search-text">
        <Header></Header>
        <Body></Body>
      </div>
    );
  }
}

ReactDom.render(<Search></Search>, document.getElementById("app"));

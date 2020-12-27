import React from "react";
import Vue from "vue";
export const Header = ({ loadComponent }) => {
  return (
    <p className="search-title" onClick={loadComponent}>
      标题(点击加载内容)
    </p>
  );
};

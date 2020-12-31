import React from "react";
export const Header = ({ loadComponent }) => {
  return (
    <p className="search-title" onClick={loadComponent}>
      标题(点击加载内容)
    </p>
  );
};

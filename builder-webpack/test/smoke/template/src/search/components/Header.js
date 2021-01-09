import React from 'react'
import PropTypes from 'prop-types'

export const Header = ({ loadComponent }) => (
  <button type="button" className="search-title" onClick={loadComponent}>
    标题(点击加载内容)
  </button>
)

Header.propTypes = {
  loadComponent: PropTypes.func.isRequired
}

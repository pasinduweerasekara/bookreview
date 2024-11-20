import { Link, NavLink} from 'react-router-dom'
import './filter.css'

import React from 'react'

function Filter() {
  return (
    <div id='filter-container'>
        <div id='filter-content'>
            <ul id='category-list'>
                <li><NavLink className="filter-category-text" to="/products/all">ALL</NavLink></li>
                {["wallets", "belts", "accessories", "women", "men"].map((item) => (
                <li key={item} className="link-item">
                  <NavLink className="filter-category-text" to={`/products/${item}`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </li>
              ))}
            </ul>
        </div>
    </div>
  )
}

export default Filter
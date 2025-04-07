import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <div className="header-content">
            <h2>Order your favourite food here</h2>
            <p>Every craving has a perfect match, and we know just where to find it! Whether you're in the mood for spicy, sweet, crunchy, or creamy, we bring the flavors you love, whenever and wherever you need them!</p>
            <a href="#explore-menu"><button id=''>View Menu</button></a>
        </div>
    </div>
  )
}

export default Header

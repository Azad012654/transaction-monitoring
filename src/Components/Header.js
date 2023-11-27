import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='Header-component'>
        <div style={{textAlign:'center'}}><h2>Data Migration</h2></div>
        <div className='nav-container'>
          <div>HELP</div>
          <div>SUPPORT</div>
          <div>DOCUMENTATION</div>
        </div>
    </div>
  )
}

export default Header
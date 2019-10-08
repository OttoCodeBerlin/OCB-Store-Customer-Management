import React from 'react'
import logo from '../images/ocb_logo_200x200.png'

export default function Navbar () {

  return (
    <div>
      <nav className="navbar fixed-top navbar-light pt-1 pb-0" style={{backgroundColor: '#D2D3D6'}}>
        <a className="navbar-brand"  style={{fontSize: '1.5rem'}} href="/">
          <img src={logo} width="50" height="50" alt="" className="d-inline-block mr-3"/>
          Customer Management System</a>
      </nav>
    </div>
  )
}

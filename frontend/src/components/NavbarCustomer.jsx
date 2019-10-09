import React from 'react'
import logo from '../images/o_clothing_logo_200x200.png'
import MediaQuery from 'react-responsive'

export default function Navbar () {

  return (
    <div className="container">
      <MediaQuery minDeviceWidth={600}>
      <nav className="navbar fixed-top navbar-light" style={{backgroundColor: '#350744'}}>
        <a className="navbar-brand"  style={{fontSize: '2rem', fontFamily: 'Permanent Marker, cursive', color: '#44A324'}} href="/">
        <img src={logo} width="50" height="50" alt="" className="d-inline-block mr-3" />
          SUSTAINABLE. FASHION. O.</a>
      </nav>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={599}>
      <nav className="navbar fixed-top navbar-light" style={{backgroundColor: '#350744'}}>
        <a className="navbar-brand"  style={{fontSize: '1rem', fontFamily: 'Permanent Marker, cursive', color: '#44A324'}} href="/">
        <img src={logo} width="30" height="30" alt="" className="d-inline-block mr-3" />
          SUSTAINABLE. FASHION. O.</a>
      </nav>
      </MediaQuery>
    </div>
  )
}

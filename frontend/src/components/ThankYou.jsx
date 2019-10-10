import React from 'react'
import NavbarCustomer from './NavbarCustomer'
import FooterCustomer from './FooterCustomer'
import MediaQuery from 'react-responsive'
import logo from '../images/ocb_logo_200x200.png'

const ThankYou = () => {
  return (
    <div>
<NavbarCustomer />
  <div className="container bg-2" >
      <div className="container" style={{ position: 'relative'}}>
        {/* Large devices, desktop */}
        <MediaQuery minDeviceWidth={600}> 
        <div className="jumbotron" style={{ marginTop: '500px', position: 'absolute'}}>
            <h2 className="display-5" style={{fontFamily: 'Permanent Marker, cursive'}}>THANK YOU.</h2>
            <h2 className="display-5" style={{fontFamily: 'Permanent Marker, cursive'}}>WE LOOK FORWARD SEEING YOU BACK IN OUR STORE.</h2>
            <br/>
            <p>Powered By {' '}
            <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1"/>
            </p>
        </div>
        </MediaQuery>
        {/* Small devices, mobile */}
        <MediaQuery maxDeviceWidth={599}> 
        <div className="jumbotron" style={{ marginTop: '80px', position: 'absolute'}}>
            <h2 className="display-5" style={{fontFamily: 'Permanent Marker, cursive'}}>THANK YOU.</h2>
            <h2 className="display-5" style={{fontFamily: 'Permanent Marker, cursive'}}>WE LOOK FORWARD SEEING YOU BACK IN OUR STORE.</h2>
            <br/>
            <p>Powered By {' '}
            <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1"/>
            </p>
        </div>
        </MediaQuery>
      </div>
  </div>
  <FooterCustomer />
  </div>
  )
}

export default ThankYou
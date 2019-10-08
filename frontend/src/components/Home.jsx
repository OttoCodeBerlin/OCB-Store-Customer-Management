import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/ocb_logo_200x200.png'
import Navbar from './Navbar'
import Footer from './Footer'
         




const Home = () => {
  return (
    <div>
      <Navbar />
  <div className="container bg">
    <div className="container" style={{ position: 'relative'}} >
    <div className="card" style={{width: '22rem', marginTop: '90px', position: 'absolute'}}>
      <div className="card-body" >
        <img src={logo} width="200" height="200" alt="" className="d-inline-block mr-3"/>
        <h6 className="card-subtitle mb-2 text-muted">Welcome to Customer Management System</h6>
        <div>
        <Link to="/signup" className="btn btn-secondary mt-4">Sign up</Link>
        <br/>
        <Link to="/login" className="btn btn-secondary mt-3 mb-3">Log in</Link>
      </div>
      </div>
      </div>
    </div>
      </div>
      <Footer />
  </div>
  )
}

export default Home;
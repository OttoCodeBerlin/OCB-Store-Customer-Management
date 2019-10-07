import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router'
import Home from '../src/components/Home'
import Signup from '../src/components/Signup'
import Login from '../src/components/Login'
import Profile from '../src/components/Profile'
import Navbar from '../src/components/Navbar'
import Footer from '../src/components/Footer'
import ThankYou from '../src/components/ThankYou'
import CustomerImage from '../src/components/CustomerImage'
import About from '../src/components/About'
require('dotenv').config()

function App() {
  return (
    
    <BrowserRouter>
    <div>
    <Navbar />
    <Route exact path="/" component={Home}/>
    <Route exact path="/signup" component={Signup}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/profile" component={Profile}/>
    <Route exact path="/thankyou" component={ThankYou}/>
    <Route exact path="/about" component={About}/>
    <Route path="/confirm/:id" component={CustomerImage}/>
    <Footer />
    </div>
    </BrowserRouter>
    
  )
}

export default App;

import React, { Component } from 'react'
import SimpleReactValidator from 'simple-react-validator'
import AuthService from '../AuthService'
import Navbar from './Navbar'
import Footer from './Footer'

export default class Signup extends Component {
  


  constructor(props) {
    super(props)
  
    this.state = {
      username: '',
      password: '',
      store_location: '',
      role: '',
      message: null
    }
  
    this.validator = new SimpleReactValidator()
  }
  
  
  

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input;

    this.setState({
      [name]: value
    })
  }

  //Submit handler with AuthService
  handleSubmit = e => {
    if (e) e.preventDefault()
    AuthService.signup(this.state)
      .then(({ data: user }) => {
        localStorage.setItem('userId', user._id)
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Call final submit
  submitForm = () => {
    if (this.validator.allValid()) {
      alert('Thank you!')
    this.handleSubmit()
    } else {
      this.validator.showMessages()
      this.forceUpdate()
    }
  }

  render() {
    const { username, password, store_location, role, message } = this.state
    return (
      <div>
        <Navbar />
        <div className="container " style={{ position: 'relative'}}>
      <div className="container" style={{marginTop: '90px', position: 'absolute'}}>

      <form className="vertical-center" onSubmit={this.handleSubmit} >
        <h5 className="title">Sign up</h5>
        <div className="form-group vertical-center">
            <label htmlFor="username">Username</label>
            <input type="text"
              name="username"
              value={username}
              placeholder="Select Username..."
              onChange={this.handleInput}
              className="form-control" id="username" 
               />
               {this.validator.message('username', username, 'required|alpha')}
 
        </div>
        <div className="form-group vertical-center">
            <label htmlFor="password">Password</label>
            <input type="password"
              name="password"
              placeholder="Password..."
              value={password}
              onChange={this.handleInput}
              className="form-control" id="password" 
               />
               {this.validator.message('password', password, 'required|min:3')}
        </div>
        <div className="form-group vertical-center">
            <label htmlFor="store-location">Store Location</label>
              <select className="custom-select mb-3" id="store_location" name="store_location" value={store_location}
                onChange={this.handleInput}>
              <option value='' disabled>Select...</option>
              <option value='Reforma'>Reforma</option>
              <option value='Polanco'>Polanco</option>
              <option value='Condesa'>Condesa</option>
              <option value='Cuauhtemoc'>Cuauhtemoc</option>
              <option value='Tacubaya'>Tacubaya</option>
              <option value='Buenos Aires, Argentina'>Buenos Aires, Argentina</option>
              <option value='La Habana, Cuba'>La Habana, Cuba</option>
            </select>
            {this.validator.message('store location', store_location, 'required|alpha')}


        </div>
        <div className="form-group vertical-center">
            <label htmlFor="role">Role</label>
            <select className="custom-select mb-3" id="role" name="role" value={role}
              onChange={this.handleInput}>
            <option value='' disabled>Select...</option>
            <option value='Sales Representative'>Sales Representative</option>
            <option value='Manager'>Manager</option>
            <option value='Admin'>Admin</option>
          </select>
          {this.validator.message('role', role, 'required|string')}
        </div>
          <button  className="btn btn-secondary" onClick={this.submitForm}>Create Account</button>
        </form>

        </div>
      {/* Customer error message, if applicable */}
          {message && <p>{message}</p>}
        
          
          </div>
          <Footer />
        </div>
    )
  }
}

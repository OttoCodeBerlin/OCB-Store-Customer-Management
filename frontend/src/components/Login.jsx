import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../AuthService'
import Navbar from './Navbar'
import Footer from './Footer'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    message: null
  }

  //Input handler
  handleInput = ({ target: input }) => {
    const { name, value } = input;
    this.setState({
      [name]: value
    })
  }

  //Submit data handler calling Auth Service
  handleSubmit = e => {
    if (e) e.preventDefault()
    AuthService.login(this.state)
      .then(({ data: user }) => {
        localStorage.setItem('userId', user._id)
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      });
  };

  submitForm = () => {
    this.handleSubmit()
  };

  render() {
    const { username, password, message } = this.state
    return (
      <div>
        <Navbar />
        <div className="container " style={{ position: 'relative'}}>
          <div className="container" style={{marginTop: '90px', position: 'absolute'}}>
            <form className="vertical-center" onSubmit={this.handleSubmit} >
            <div className="form-group vertical-center">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" name="username" value={username}
                  onChange={this.handleInput} />
              </div>
              <div className="form-group">
                <label htmlFor="password" >Password</label>
                <input type="password" className="form-control" id="password" name="password" value={password}
                  onChange={this.handleInput}/>
              </div>
              <button type="submit" className="btn btn-secondary" onClick={this.submitForm}>Log In</button>
            <div className="mt-3">
              {message && <p>{message}</p>}
            </div>
            <p className="mt-5">
              If you don't have an account, please sign up {' '}
              <Link to="/signup">here</Link>.
            </p>
            </form>
            </div>
        </div>
        <Footer />
        </div>
    )
    
  }
}

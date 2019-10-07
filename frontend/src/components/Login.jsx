import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from '../AuthService'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    message: null
  }

  handleInput = ({ target: input }) => {
    const { name, value } = input;

    this.setState({
      [name]: value
    })
  }

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
    <div className="container bg">
      <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">OCB Store Management Customer Admin System</h1>
      </div>
        </div>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={username}
              onChange={this.handleInput} />
          </div>
          <div className="form-group">
            <label htmlFor="password" >Password</label>
            <input type="password" className="form-control" id="password" name="password" value={password}
              onChange={this.handleInput}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.submitForm}>Log In</button>
        </form>
        <p className="mt-5">
          If you don't have an account, please sign up {' '}
          <Link to="/signup">here</Link>.
        </p>
      
         
      {message && <p>{message}</p>}
        </div>
    )
    
  }
}

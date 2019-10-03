import React, { Component } from 'react'
import AuthService from '../AuthService'

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    store_location: '',
    role: '',
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

    AuthService.signup(this.state)
      .then(({ data: user }) => {
        localStorage.setItem('userId', user._id)
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  submitForm = () => {
    this.handleSubmit()
  }

  render() {
    const { username, password, store_location, role, message } = this.state

    return (
      <div className="container bg">
        
        <div className="container">
      <div className="jumbotron">
  <h1 className="display-4">OCB Store Management Customer Admin System</h1>
</div>
        </div>
        <h5 className="title">Sign up</h5>
        <div className="input-group mb-3">
        <form onSubmit={this.handleSubmit}>
        
          {message && <p>{message}</p>}
          <label >
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          <label>
            Store Location
            <input
              type="text"
              name="store_location"
              value={store_location}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          <label>
            Role
            <input
              type="text"
              name="role"
              value={role}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>

          <button type="submit" hidden />
          <button className="button btn-primary" onClick={this.submitForm}>
            Create Account
          </button>
      

        </form>
        </div>
       
          
          
        </div>
    )
  }
}

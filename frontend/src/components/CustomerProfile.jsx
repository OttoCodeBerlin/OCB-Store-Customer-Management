import React, { Component } from 'react'
import AuthService from '../AuthService'

export default class CustomerProfile extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    customer_id: this.props.match.params.id,
    message: null
  }

  handleInput = ({ target: input }) => {
    const { name, value } = input;

    this.setState({
      [name]: value
    })
  }


  // handleInput = ({ target: input }) => {
  //   const { value } = input;
  //   this.setState({
  //     customer_email: value
  //   })
  // }


  handleSubmit = e => {
    if (e) e.preventDefault()
    AuthService.modify_customer(this.state)
      .then(({customer}) => {
        // localStorage.setItem('customerId', customer._id)
        this.props.history.push('/thankyou')
      })
      .catch(({ response: { data } }) => {
        console.log(data)
        this.setState({ message: data.message })
      })
  }

  submitForm = () => {
    this.handleSubmit()
  }

  render() {
    const { first_name, last_name, email, message } = this.state

    return (
      <div className="container bg">
        
        <div className="container">
      <div className="jumbotron">
  <h1 className="display-4">Dear Customer</h1>
</div>
        </div>
        <h5 className="title">Please complete your information</h5>
        <div className="input-group mb-3">
        <form onSubmit={this.handleSubmit}>
        
          {message && <p>{message}</p>}
          <label >
            First Name
            <input
              type="text"
              name="first_name"
              value={first_name}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          <label >
            Last Name
            <input
              type="text"
              name="last_name"
              value={last_name}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          <label >
            Email
            <input
              type="text"
              name="email"
              value={email}
              onChange={this.handleInput}
              className="form-control"
            />
          </label>
          
          <button className="button btn-primary" type="submit" >
            Create
          </button>
      

        </form>
        </div>
       
          
          
        </div>
    )
  }
}

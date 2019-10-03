import React, { Component } from 'react'
import AuthService from '../AuthService'


export default class Profile extends Component {
  state = {
    user: null,
    message: null, 
    customer_email: '',
    customers: [],
    pictures: []
  }

  componentDidMount() {
    this.getCustomerDataFromDb()
    this.getPictureDataFromDb()
    AuthService.loggedin()
      .then(({ data }) => {
        this.setState({ user: data })
       })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message });
      })
  }

  getCustomerDataFromDb=()=> {
    fetch('http://localhost:5000/auth/customers')
    .then((data)=> data.json())
    .then((res)=> this.setState({customers: res.allCustomers}))
  }

  getPictureDataFromDb=()=> {
    fetch('http://localhost:5000/auth/pictures')
    .then((data)=> data.json())
    .then((res)=> this.setState({pictures: res.allPictures}))
  }

  deleteCustomer=(id)=> {
    console.log(id)
    fetch('http://localhost:5000/auth/delete_customer/:id')
    .then((data)=>console.log(data))
    .then((res)=> console.log(res))
  }

  handleInput = ({ target: input }) => {
    const { value } = input;
    this.setState({
      customer_email: value
    })
  }

  handleSubmit = e => {
    if (e) e.preventDefault()
    console.log(this.state)
    AuthService.add_customer(this.state)
      .then(({user, customer_email}) => {
        // console.log(user, customer_email)
        // localStorage.setItem('userId', user._id)
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  submitForm = () => {
    this.handleSubmit()
  }

  handleLogout = () => {
    AuthService.logout();
    this.props.history.push('/');
  };

  render() {
    const { user, message, customer_email} = this.state
    console.log(this.state)

    const customers = this.state.customers.map(customer => (
             <tr key={customer._id}>
              <td className="align-middle">{customer.first_name}</td>
              <td className="align-middle">{customer.last_name}</td>
              <td className="align-middle">{customer.email}</td>
              <td className="align-middle"><h1>Img</h1></td>
              <td className="align-middle"><img src={ require('../images/trash.jpg') } alt="Delete Customer" width="30"
              /> <button onClick={this.deleteCustomer(customer._id)}>Delete</button></td>
            </tr>
    ))

    if (!user) return <p>{message}</p>;

    return (
      <div className="container bg">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">Profile Overview</h1>
          </div>
        </div>
          <h1 className="title">Profile</h1>
        <div>
          <ul className="list-group">
            <li className="list-group-item active">Username:</li>
            <li className="list-group-item">{user.username}</li>
            <li className="list-group-item active">Store Location:</li>
            <li className="list-group-item">{user.store_location}</li>
            <li className="list-group-item active">Role:</li>
            <li className="list-group-item">{user.role}</li>
          </ul>
        </div>   
          <br/>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
          {message && <p>{message}</p>}
            <label>
                    Add Customer by email
                    <input
                      type="text"
                      name="customer_email"
                      value={customer_email}
                      onChange={this.handleInput}
                      className="form-control"
                    />
            </label>
            <button type="submit" className="button btn-primary">
              Add
            </button>
          </form>
        </div>
        <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Pictures</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers}
          </tbody>
        </table>



         
        </div>
        <p>
          <button className="button btn-primary" onClick={this.handleLogout}>
            Logout
          </button>
        </p>
        </div>
    )

  }
}
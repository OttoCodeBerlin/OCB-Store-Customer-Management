import React, { Component } from 'react'
import AuthService from '../AuthService'
import Navbar from './Navbar'


export default class Profile extends Component {

  state = {
    user: null,
    message: null, 
    customer_email: '',
    customers: [],
    pictures: [], 
    is_addcustomer_visible: true,
    is_customerlist_visible: false,
    is_useraccount_visible: false
  }

  componentDidMount() {
    this.getCustomerDataFromDb()
    AuthService.loggedin()
      .then(({ data }) => {
        this.setState({ user: data })
       })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message });
      })
  }

  componentDidUpdate(prevProps) {
    const {match: {params: {value}}}=this.props
    if (prevProps.match.params.value !== value) {
    }
  }

  getCustomerDataFromDb=()=> {
    fetch('http://localhost:5000/auth/customers')
    .then((data)=> data.json())
    .then((res)=> this.setState({customers: res.allCustomers}))
  }

  deleteCustomer = (id, e) => {
    e.preventDefault()
    AuthService.delete_customer(this.state, id)
      .then(response => {
        fetch('http://localhost:5000/auth/customers')
        .then((data)=> data.json())
        .then((res)=> this.setState({customers: res.allCustomers}))
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
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
    AuthService.logout()
    this.props.history.push('/')
  }

  click_addcustomer = () => {
    this.setState(prevState => ({ is_addcustomer_visible: true, is_customerlist_visible: false, is_useraccount_visible: false }))
  }

  click_customerlist = () => {
    this.setState(prevState => ({ is_addcustomer_visible: false, is_customerlist_visible: true, is_useraccount_visible: false }))
  }

  click_useraccount = () => {
    this.setState(prevState => ({ is_addcustomer_visible: false, is_customerlist_visible: false, is_useraccount_visible: true }))
  }

  render() {
    const { user, message, customer_email} = this.state
  
    const customers = this.state.customers.map(customer => (
             <tr key={customer._id}>
              <td className="align-middle">{customer.first_name}</td>
              <td className="align-middle">{customer.last_name}</td>
              <td className="align-middle">{customer.email}</td>

              {customer.picture_one ?
               <td className="align-middle"><img src= {customer.picture_one.image_data} style={{ height: '30%', width: 'auto', marginRight: '10px' }} alt=""/><img src={customer.picture_two.image_data} style={{ height: '30%', width: 'auto' }} alt=""/></td>
              : 
              <td className="align-middle"><small style={{ color: 'red' }}>Customer Confirmation Pending</small></td>
              }
              <td className="align-middle"><button className="btn btn-danger btn-sm" type="button" onClick={this.deleteCustomer.bind(this, customer._id)}>Delete</button></td>

          {/* <td className="align-middle"><button className="btn btn-danger btn-sm" type="button" onClick={this.deleteCustomer.bind(this, customer._id)}>Delete</button></td> */}
            </tr>  
   
       ))


    if (!user) return <p>{message}</p>

    return (
      <div>
        <Navbar user_info={this.state.user} />
      <div className="container bg mt-5 pt-3">
        

      <div className="card text-center mt-5">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className={`nav-link ${this.state.is_addcustomer_visible ? ' active' : ' ' }`} onClick={this.click_addcustomer} style={{cursor: 'pointer'}}>Add Customers</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.is_customerlist_visible ? ' active' : ' ' }`} onClick={this.click_customerlist} style={{cursor: 'pointer'}}>Customer List</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.is_useraccount_visible ? ' active' : ' ' }`} onClick={this.click_useraccount} style={{cursor: 'pointer'}}>User Account</a>
            </li>
          </ul>
        </div>
        <div className={`card-body ${(this.state.is_useraccount_visible || this.state.is_customerlist_visible) ? ' d-none' : ' d-block' }`}>
          <h5 className="card-title">Add Customer by Email</h5>
          <div className="container">
          <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label></label>
              <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" name="customer_email" value={customer_email} onChange={this.handleInput}/>
          </div>
            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </form>
        </div>
        </div>
        <div className={`card-body ${(this.state.is_addcustomer_visible || this.state.is_useraccount_visible) ? ' d-none' : ' d-block' }`}>
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
        <div className={`card-body ${(this.state.is_addcustomer_visible || this.state.is_customerlist_visible) ? ' d-none' : ' d-block' }`}>
        <div className="card" >
        <div className="card-header" style={{backgroundColor: '#D2D3D6' }}>
          User Information
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-left">Username: <b>{user.username}</b></li>
          <li className="list-group-item text-left">Store Location: <b>{user.store_location}</b></li>
          <li className="list-group-item text-left">Role: <b>{user.role}</b></li>
        </ul>
      </div>
      <button className="btn btn-primary mt-3" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {message && <p>{message}</p>}
        
        
        </div>
        </div>
        
    )

  }
}
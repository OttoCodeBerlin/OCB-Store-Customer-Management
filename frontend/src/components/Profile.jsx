import React, { Component } from 'react'
import AuthService from '../AuthService'
import ReactImageMagnify from 'react-image-magnify'
import Navbar from './Navbar'
import Footer from './Footer'
import logo_sco from '../images/sustainable_fashion_o_logo.jpg'

export default class Profile extends Component {


  constructor(props) {
    super(props)
  
    this.state = {
      user: null,
      message: null, 
      customer_email: '',
      customers: [],
      filtered_customers: [],
      pictures: [], 
      is_addcustomer_visible: true,
      is_customerlist_visible: false,
      is_useraccount_visible: false,
      is_search_unsuccessful: false,
      no_search_value: false
    }
  
    this.deleteCustomer=this.deleteCustomer.bind(this)
  }

  

  
//Lifecycle method 1
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

  //Lifecycle Method 2
  componentDidUpdate(prevProps) {
     const {match: {params: {value}}}=this.props
    if (prevProps.match.params.value !== value) {
    }
  }

  //Get customers from database
  getCustomerDataFromDb=()=> {
    fetch(process.env.REACT_APP_API_URL + '/auth/customers')
    // fetch('http://localhost:5000/auth/customers')
    .then((data)=> data.json())
    .then((res)=> this.setState({customers: res.allCustomers}))
  }

  //Delete a customer in database and update view
  deleteCustomer = (id, e) => {
    e.preventDefault()
    AuthService.delete_customer(this.state, id)
      .then(response => {
        fetch(process.env.REACT_APP_API_URL + '/auth/customers')
        .then((data)=> data.json())
        .then((res)=> this.setState({customers: res.allCustomers}))
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Send reminder email to customer
  resendCustomer = (id, e) => {
    e.preventDefault()
    AuthService.resend_customer(this.state, id)
      .then(response => {
        fetch(process.env.REACT_APP_API_URL + '/auth/customers')
        .then((data)=> data.json())
        .then((res)=> this.setState({customers: res.allCustomers}))
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Input change handler for customer email input
  handleInput = ({ target: input }) => {
    const { value } = input;
    this.setState({
      customer_email: value
    })
  }

  //Submit handler for customer email input
  handleSubmit = e => {
    if (e) e.preventDefault()
    AuthService.add_customer(this.state)
      .then(({user, customer_email}) => {
        alert('Added')
        this.resetForm()
        this.props.history.push('/profile')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
  }

  //Form Submit handler for customer email
  submitForm = () => {
    this.handleSubmit()
  }

  //Reset customer email after submission
  resetForm = () => {
    this.setState({customer_email: ''})
  }

  //Auth logout method
  handleLogout = () => {
    AuthService.logout()
    this.props.history.push('/')
  }

  //View handler for Add Customer tab
  click_addcustomer = () => {
    this.setState(prevState => ({ is_addcustomer_visible: true, is_customerlist_visible: false, is_useraccount_visible: false }))
  }

  //View handler for Customer List tab
  click_customerlist = () => {
    this.setState(prevState => ({ is_addcustomer_visible: false, is_customerlist_visible: true, is_useraccount_visible: false }))
  }

  //View handler for User Account tab
  click_useraccount = () => {
    this.setState(prevState => ({ is_addcustomer_visible: false, is_customerlist_visible: false, is_useraccount_visible: true }))
  }

  //Filter method for customer list
  filterCustomers = (e) => { 
    this.state.no_search_value && this.state.filtered_customers.length===0 ? this.setState({is_search_unsuccessful: true}) : this.setState({is_search_unsuccessful: false})
    const {value} = e.target 
    value.length>0 ? this.setState({no_search_value: true}) : this.setState({no_search_value: false})
    const {customers} = this.state 
    const query = value.toLowerCase()
    const filtered_customers=customers.filter(customer => {
      if (customer.last_name) {
      return customer.last_name.toLowerCase().includes(query) 
      } 
      return null
    })
    this.setState({filtered_customers})
  }

  //RENDER VIEW
  render() {
    let customer_group
    const { user, message, customer_email} = this.state
    //Show original customer list if search field is empty, and filtered list if search is in place
    this.state.filtered_customers.length===0 && !this.state.no_search_value ? customer_group = this.state.customers : customer_group = this.state.filtered_customers
    
    //FILTERED CUSTOMERS MAPPING LIST
    let customers
    if (customer_group.length===0) { //If search has no results show warning
      customers = (
        // <div className="container mt-5 ml-5">
        //   <div className="alert alert-danger" role="alert" >
          <tr><th>Sorry, no entries found matching your criteria.</th></tr>
        // </div>
        //</div> 
        )
      
    } else {
      customers = customer_group.map(customer => ( //if search has results, show them in a list
       <tr key={customer._id}>
        <td className="align-middle p-0">{customer.first_name}</td>
        <td className="align-middle p-0" >{customer.last_name}</td>
        <td className="align-middle p-0"><small>{customer.email}</small></td>

        {customer.picture_one ?   //If customer pictures exist, show them with links to large view
         <td className="align-middle p-0"> 
         <span>
         <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Customer Image One',
                  width: 128,
                  height: 96,
                  src: customer.picture_one.image_data
              },
              largeImage: {
                  src: customer.picture_one.image_data,
                  width: 640,
                  height: 480,
                  enlargedImageContainerDimensions: {width: '200%', height: '200%'},
                  enlargedImagePosition: 'over'
              }
          }} className="m-1"/>
         {/* <a href={customer.picture_one.image_data} target="_blank" style={{cursor: 'pointer'}}  onClick={()=>{ window.open(customer.picture_one.image_data, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=700, height=500, top=30") }}> */}
         {/* <img src={customer.picture_one.image_data} style={{ height: 'auto', width: '30%', margin: '5px' }} alt="" className="thumbnail"/> */}
         <ReactImageMagnify {...{
              smallImage: {
                  alt: 'Customer Image Two',
                  width: 128,
                  height: 96,
                  src: customer.picture_two.image_data
              },
              largeImage: {
                  src: customer.picture_two.image_data,
                  width: 640,
                  height: 480,
                  enlargedImageContainerDimensions: {width: '200%', height: '200%'},
                  enlargedImagePosition: 'over'
              }
          }} className="m-1"/></span>
         
         {/* <a href={customer.picture_two.image_data} target="_blank" style={{cursor: 'pointer'}}  onClick={()=>{ window.open(customer.picture_two.image_data, "Popup","toolbar=no, location=no, statusbar=no, menubar=no, scrollbars=1, resizable=0, width=700, height=500, top=30") }}> */}
         {/* <img src={customer.picture_two.image_data} style={{ height: 'auto', width: '30%' , margin: '5px'  }} alt="" className="thumbnail"/> */}
         </td>
        : 
        <td className="align-middle p-0"><small style={{ color: 'red' }}>Customer Confirmation Pending</small></td>
        }
        <td className="align-middle p-0"><small>{customer.updatedAt.substring(0,10)}</small></td>
        <td className="align-middle p-0">
          <button className="btn btn-danger btn-sm m-2" type="button" onClick={(e) => {if(window.confirm('You are going to delete the customer data. Are you sure?')){this.deleteCustomer(customer._id, e)};}}>Delete</button>
          <button className="btn btn-warning btn-sm m-2" type="button" onClick={(e) => {if(window.confirm('You are going to send an email to the customer to request new data. Are you sure?')){this.resendCustomer(customer._id, e)};}}>Resend</button>
        </td>
      </tr>  

 ))
    } 

    //Message if login is not valid
    if (!user) return <p>{message}</p>

    return (
      //NAVBAR
      <div>
        <Navbar />
      <div className="container mt-5 pt-3">

      {/* CARD HEADER LAYOUT */}
      <div className="card text-center mt-5 mb-5">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button className={` ${this.state.is_addcustomer_visible ? ' nav-link active cards-button-active' : ' nav-link cards-button-inactive' }`} onClick={this.click_addcustomer} style={{outline: 'none'}}>Add Customers</button>
            </li>
            <li className="nav-item">
              <button className={` ${this.state.is_customerlist_visible ? ' nav-link active cards-button-active' : ' nav-link cards-button-inactive' }`} onClick={this.click_customerlist} style={{outline: 'none'}}>Customer List</button>
            </li>
            <li className="nav-item">
              <button className={` ${this.state.is_useraccount_visible ? ' nav-link active cards-button-active' : ' nav-link cards-button-inactive' }`} onClick={this.click_useraccount} style={{outline: 'none'}}>User Account</button>            
            </li>
          </ul>
        </div>

        {/* ADD CUSTOMER */}
        <div className={`card-body ${(this.state.is_useraccount_visible || this.state.is_customerlist_visible) ? ' d-none' : ' d-block' }`}>
          <h4 className="card-title mt-2 mb-3">Add Customer by Email</h4>
          <div className="container">
          <form onSubmit={this.handleSubmit}>
          <div className="input-group input-group lg">
              <input type="email" className="form-control" id="customer_email" placeholder="name@example.com" name="customer_email" style={{height: '55px', fontSize: '1.5rem'}} value={customer_email} onChange={this.handleInput}/>
          </div>
            <button type="submit" className="btn btn-secondary btn-lg mt-3">
              ADD CUSTOMER
            </button>
          </form>
        </div>
        </div>

        {/* CUSTOMER LIST */}
        <div className={`card-body ${(this.state.is_addcustomer_visible || this.state.is_useraccount_visible) ? ' d-none' : ' d-block' }`}>
            <div className="container">
            <input type="text" className="form-control mb-3" placeholder="Filter Customers by Last Name..." onChange={this.filterCustomers}/>
            </div>
            <div className="container">
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Pictures</th>
                  <th scope="col">Last Updated</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers}
              </tbody>
            </table>
            </div>

         {/* USER ACCOUNT INFORMATION */}
        <div className={`card-body ${(this.state.is_addcustomer_visible || this.state.is_customerlist_visible) ? ' d-none' : ' d-block' }`}>
        <div className="card" >
        <div className="card-header" style={{backgroundColor: '#D2D3D6' }}>
          User Information
        </div>
        <ul className="list-group list-group-flush">
          <div className="container" style={{width: '300px', padding: '0'}}>
            <li className="list-group-item" style={{padding: '10px 3px'}}><img src={logo_sco} alt="Logo" style={{maxWidth: '100%', maxHeight: '100%', padding: '0', margin: '0'}}/></li>
          </div>
          <li className="list-group-item text-center">Username: <b>{user.username}</b></li>
          <li className="list-group-item text-center">Store Location: <b>{user.store_location}</b></li>
          <li className="list-group-item text-center">Role: <b>{user.role}</b></li>
        </ul>
      </div>
      <button className="btn btn-secondary mt-3" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
      {message && <p>{message}</p>}
        
        
        </div>
        <Footer />
        </div>
        
    )

  }
}
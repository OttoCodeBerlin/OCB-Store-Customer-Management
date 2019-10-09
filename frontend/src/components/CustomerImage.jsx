import React, { Component } from 'react'
import AuthService from '../AuthService'
import Webcam from 'react-webcam'
import {storage} from '../firebase-config'
import NavbarCustomer from './NavbarCustomer'
import FooterCustomer from './FooterCustomer'
import logo from '../images/ocb_logo_200x200.png'

export default class CustomerImage extends Component {

  state = {
    first_name: '',
    last_name: '',
    email: '',
    picture_one: null,
    picture_two: null,
    customer_id: this.props.match.params.id,
    message: null,
    imageData_one: '',
    imageData_two: '',
    image_name: 'default',
    saveImage: false,
  }

  //Handle Customer data input
  handleInput = ({ target: input }) => {
    const { name, value } = input;
    this.setState({
      [name]: value
    })
  }

  //Set Webcam reference
  setRef=(webcam) => {
    this.webcam=webcam
  }

  //Write first picture in database
  memoryDataOne = id => {
    let memory=this.state
    memory.picture_one= id
    AuthService.modify_customer(memory)
      .then(({customer}) => {
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
    }
  
    //Write second picture in database
  memoryDataTwo = id => {
    let memory=this.state
    memory.picture_two= id
    AuthService.modify_customer(memory)
    .then(({customer}) => {
    })
    .catch(({ response: { data } }) => {
      this.setState({ message: data.message })
    })
  }


  //Take first shot
  capture_one = () => {
    const imageSrc=this.webcam.getScreenshot()
    this.setState({
      imageData_one: imageSrc
    })
  }

  //Take second shot
  capture_two = () => {
    const imageSrc=this.webcam.getScreenshot()
    this.setState({
      imageData_two: imageSrc
    })
  }

  //Save all data - call image save methods and write customer information to database
  handleSaveSubmit=(e)=> {
    e.preventDefault()

    //Conversion function to write raw data to image file
    function dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {type:mime});
    }

    let img_one = dataURLtoFile(this.state.imageData_one, this.state.image_name + '1.jpg')
    let img_two = dataURLtoFile(this.state.imageData_two, this.state.image_name + '2.jpg')
    this.uploadImage_one(img_one)
    this.uploadImage_two(img_two)
    
    //Customer information change handler
    AuthService.modify_customer(this.state)
      .then(({customer}) => {
        // localStorage.setItem('customerId', customer._id)
        this.props.history.push('/thankyou')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      })
    }

    //Upload image one
    uploadImage_one(e) {
      let imageObj = {}
        let currentImageName = 'image-'+ this.state.customer_id +'-'+ Date.now()
        let uploadImage = storage.ref(`images/${currentImageName}`).put(e)
  
        uploadImage.on('state_changed',
          (snapshot) => { },
          (error) => {
            alert(error)
          },
          () => {
            storage.ref('images').child(currentImageName).getDownloadURL().then(url => {
  
              this.setState({
                firebaseImage: url
              })
  
              // store image object in the database
              imageObj = {
                image_name: currentImageName,
                image_data: url,
                customerId: this.state.customer_id
              }
              AuthService.modify_customer_image_one(imageObj)
              .then((data) => {
                this.memoryDataOne(data.data._id)                  
                })
                .catch((err) => {
                  alert("Error while uploading image using firebase storage")
                })
            })
          })
      }

      //Upload image 2
      uploadImage_two(e) {
        let imageObj = {}
          let currentImageName = 'image-'+ this.state.customer_id +'-'+ Date.now()
          let uploadImage = storage.ref(`images/${currentImageName}`).put(e)
    
          uploadImage.on('state_changed',
            (snapshot) => { },
            (error) => {
              alert(error)
            },
            () => {
              storage.ref('images').child(currentImageName).getDownloadURL().then(url => {
                this.setState({
                  firebaseImage: url
                })
    
                // store image object in the database
                imageObj = {
                  image_name: currentImageName,
                  image_data: url,
                  customerId: this.state.customer_id
                }
                AuthService.modify_customer_image_two(imageObj)
                .then((data) => {
                  this.memoryDataTwo(data.data._id)                   
                  })
                  .catch((err) => {
                    alert("Error while uploading image using firebase storage")
                  })
              })
            })
        }
  
        //RENDER PAGE
  render() {
    const { first_name, last_name, email, message } = this.state
    
      //Set video settings: Front camera, small picture size
      const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
      }
 
    return (
      <div className="container bg-2" >
        <NavbarCustomer />
        {/* Header */}
        <div className="container mt-5" >
          <div className="jumbotron mt-5" >
            <div className="container">
            <h2 className="title" style={{fontFamily: 'Permanent Marker, cursive'}}>DEAR CUSTOMER</h2>
            <h5 className="title">WE NEED SOME MORE INFORMATION.</h5>
            </div>
            <div className="input-group mb-3">
          
          {/* Camera image */}
          <div className="container">
              <Webcam
                audio={false}
                height={240}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={320}
                videoConstraints={videoConstraints}
              className="rounded float-left" style={{border: '1px solid #6C757D'}}/>
              <div className="button-container">
              <span><button className="btn btn-secondary m-1" onClick={this.capture_one}>CAPTURE PHOTO 1</button></span>
              <span><button className="btn btn-secondary m-1" onClick={this.capture_two}>CAPTURE PHOTO 2</button></span>
              </div>
              {/* Show image one after it was created */}
              {this.state.imageData_one ?
                <div>
                  <p>
                    <img src={this.state.imageData_one} alt="" className="mt-5" />
                  </p>
                  </div>
              : null}
              {/* Show image two and input fields and submit button after second pic was created */}
              {this.state.imageData_two ?
                <div>
                  <p>
                    <img src={this.state.imageData_two} alt=""/>
                  </p>
          <form >
                  <div className="form-row">
          <div className="col-md-4 mb-3">
          <label htmlFor="first_name">
            FIRST NAME
            <input
            id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </label>
          <label htmlFor="last_name">
            LAST NAME
            <input
            id="email"
              type="text"
              name="last_name"
              value={last_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </label>
          <label htmlFor="email">
            EMAIL
            <input
            id="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </label>
          <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                    <label className="form-check-label" htmlFor="invalidCheck2">
                    AGREE TO TERMS AND CONDITIONS
                  </label>
                </div>
                </div>
                {message && <p>{message}</p>} 
          </div>
          </div>
           </form>      
           <button className="btn btn-secondary" onClick={this.handleSaveSubmit} type="submit">SAVE</button>
          <p style={{fontFamily: 'Barlow, sans-serif'}}>Powered By {' '}
                      <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1"/>
                      </p>
           </div>
              : null}
           
          </div>
          </div>
        </div>
        </div>
        <FooterCustomer />
        </div>
    )
  }
}


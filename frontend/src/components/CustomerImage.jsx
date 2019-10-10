import React, { Component } from 'react'
import AuthService from '../AuthService'
import Webcam from 'react-webcam'
import {storage} from '../firebase-config'
import NavbarCustomer from './NavbarCustomer'
import FooterCustomer from './FooterCustomer'
import MediaQuery from 'react-responsive'
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
    setTimeout(() => AuthService.modify_customer(this.state)
      .then(({customer}) => {
        // localStorage.setItem('customerId', customer._id)
        this.props.history.push('/thankyou')
      })
      .catch(({ response: { data } }) => {
        this.setState({ message: data.message })
      }), 1000)
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
          {/* View for large devices - Desktop */}
        <MediaQuery minDeviceWidth={1024}>
          <div className="jumbotron" style={{opacity: '0.9', marginLeft: '15vw', marginRight: '15vw'}}>
            <div className="container" style={{textAlign: 'center'}}>
            <h2 className="title" style={{fontFamily: 'Permanent Marker, cursive'}}>DEAR CUSTOMER</h2>
            <h5 className="title">WE NEED SOME MORE INFORMATION.</h5>
            <h5 className="title">LET'S START WITH TWO PHOTOS.</h5>
            </div>
            <div className="container" style={{textAlign: 'center'}}>
              <button className="btn btn-secondary m-1" onClick={this.capture_one}>CAPTURE PHOTO 1</button>
              <button className="btn btn-secondary m-1" onClick={this.capture_two}>CAPTURE PHOTO 2</button>
          </div>
          <div className="container" style={{textAlign: 'center'}}>
          <small>On mobile devices, please turn to LANDSCAPE mode for the photos.</small>
          </div>
          {/* Camera image */}
          <div className="container m-1"style={{textAlign: 'center', opacity: '1'}}>
              <Webcam
                audio={false}
                height={336}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={448}
                videoConstraints={videoConstraints}
                className="rounded " 
                style={{border: '1px solid #6C757D'}}/>
          </div>
          
              {/* Show image one after it was created */}
              {this.state.imageData_one ?
                <div className="container m-1" style={{textAlign: 'center'  , position: 'relative'}}>
                    <img src={this.state.imageData_one} alt="" 
                    className="rounded" style={{border: '1px solid #6C757D', opacity: '1'}} />
                    <span className="badge badge-secondary" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 1</span>
                  </div>
              : null}

              {/* Show image two AND input fields and submit button after second pic was created */}
              {this.state.imageData_two ?
              <div style={{textAlign: 'center'}}>
                <div className="container m-1" style={{textAlign: 'center'}}>
                    <img src={this.state.imageData_two} alt=""
                    className="rounded mt-1" style={{border: '1px solid #6C757D', opacity: '1'}}/>
                    <span className="badge badge-secondary" style={{position: 'absolute', top: '116%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 2</span>
                </div>
                <div className="container">
              <form>
              <h5 className="title mt-4">MORE ABOUT YOU.</h5>
          <div className="form-group">
          <label htmlFor="first_name">FIRST NAME</label>
            <input
            id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="last_name">LAST NAME</label>
            <input
            id="email"
              type="text"
              name="last_name"
              value={last_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="email">EMAIL</label>
            <input
            id="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                    <label className="form-check-label" htmlFor="invalidCheck2">
                    AGREE TO <a href="https://www.termsfeed.com/blog/wp-content/uploads/2019/04/terms-and-conditions-template.pdf" target="_blank" rel="noopener noreferrer">TERMS AND CONDITIONS</a> 
                  </label>
                </div>
                </div>
                {message && <p>{message}</p>} 
          
           </form>      
           </div>
           <div className="container">
           <button className="btn btn-secondary" onClick={this.handleSaveSubmit} type="submit">SAVE &amp; SEND</button>
          <p style={{fontFamily: 'Barlow, sans-serif'}}>Powered By {' '}
                      <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1"/>
                      </p>
           </div>
           </div>
              : null}
        </div>
        </MediaQuery>
        {/* View for mobile devices */}
        <MediaQuery maxDeviceWidth={1023}>
          <div className="jumbotron" style={{opacity: '0.9', backgroundColor: '#FFFFFF'}}>
            <div className="container" style={{textAlign: 'center'}}>
            <h2 className="title" style={{fontFamily: 'Permanent Marker, cursive'}}>DEAR CUSTOMER</h2>
            <h5 className="title">WE NEED SOME MORE INFORMATION.</h5>
            <h5 className="title">LET'S START WITH TWO PHOTOS.</h5>
            </div>
            <div className="container" style={{textAlign: 'center'}}>
              <button className="btn btn-secondary m-1 ml-1" onClick={this.capture_one}>CAPTURE PHOTO 1</button>
              <button className="btn btn-secondary m-1 ml-1" onClick={this.capture_two}>CAPTURE PHOTO 2</button>
          </div>
          {/* Camera image */}
          <div className="container m-1" style={{textAlign: 'center', opacity: '1'}}>
              <Webcam
                audio={false}
                height={144}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={192}
                videoConstraints={videoConstraints}
                className="rounded " 
                style={{border: '1px solid #6C757D', textAlign: 'center'}}/>
          </div>
          
              {/* Show image one after it was created */}
              {this.state.imageData_one ?
                <div className="container m-1" style={{textAlign: 'center'  , position: 'relative'}}>
                    <img src={this.state.imageData_one} alt="" 
                    className="rounded" style={{border: '1px solid #6C757D', textAlign: 'center', opacity: '1'}} />
                    {/* <span className="badge badge-secondary" style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 1</span> */}
                  </div>
              : null}

              {/* Show image two AND input fields and submit button after second pic was created */}
              {this.state.imageData_two ?
              <div style={{textAlign: 'center'}}>
                <div className="container m-1" style={{textAlign: 'center'}}>
                    <img src={this.state.imageData_two} alt=""
                    className="rounded mt-1" style={{border: '1px solid #6C757D', textAlign: 'center', opacity: '1'}}/>
                    {/* <span className="badge badge-secondary" style={{position: 'absolute', top: '80%', left: '50%', transform: 'translate(-50%, -50%)'}}>PHOTO 2</span> */}
                </div>
                <div className="container">
              <form>
              <h5 className="title mt-4">MORE ABOUT YOU.</h5>
          <div className="form-group">
          <label htmlFor="first_name">FIRST NAME</label>
            <input
            id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="last_name">LAST NAME</label>
            <input
            id="email"
              type="text"
              name="last_name"
              value={last_name}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
          <label htmlFor="email">EMAIL</label>
            <input
            id="email"
              type="text"
              name="email"
              value={email}
              onChange={this.handleInput}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                    <label className="form-check-label" htmlFor="invalidCheck2">
                    AGREE TO <a href="https://www.termsfeed.com/blog/wp-content/uploads/2019/04/terms-and-conditions-template.pdf" target="_blank" rel="noopener noreferrer">TERMS AND CONDITIONS</a> 
                  </label>
                </div>
                </div>
                {message && <p>{message}</p>} 
          
           </form>      
           </div>
           <div className="container">
           <button className="btn btn-secondary" onClick={this.handleSaveSubmit} type="submit">SAVE &amp; SEND</button>
          <p style={{fontFamily: 'Barlow, sans-serif'}}>Powered By {' '}
                      <img src={logo} width="80" height="80" alt="" className="d-inline-block pb-1"/>
                      </p>
           </div>
           </div>
              : null}
        </div>
        </MediaQuery>





        </div>
        <FooterCustomer />
        </div>
    )
  }
}


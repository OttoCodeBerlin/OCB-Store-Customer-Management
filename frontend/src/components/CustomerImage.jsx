import React, { Component } from 'react'
import AuthService from '../AuthService'
import Webcam from 'react-webcam'
//import axios from 'axios'
import {storage} from '../firebase-config'
// import {saveJobImage} from '../actions'
//const API_URL='http://localhost:5000'
  


export default class CustomerImage extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    customer_id: this.props.match.params.id,
    message: null,
    imageData_one: null,
    imageData_two: null,
    image_name: 'default',
    saveImage: false,
    // cloud_image: '',
    // firebaseImage: ''
  }

  handleInput = ({ target: input }) => {
    const { name, value } = input;

    this.setState({
      [name]: value
    })
  }

 setRef=(webcam) => {
    this.webcam=webcam
  }


capture_one = () => {
    const imageSrc=this.webcam.getScreenshot()
    this.setState({
      imageData_one: imageSrc
    })
  }

  capture_two = () => {
    const imageSrc=this.webcam.getScreenshot()
    this.setState({
      imageData_two: imageSrc
    })
  }

  handleSaveSubmit=(e)=> {
    e.preventDefault()

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
    this.uploadImage(img_one)
    this.uploadImage(img_two)

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



  uploadImage(e) {
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

            AuthService.modify_customer_image(imageObj)
            //axios.post(`${API_URL}/modify_customer_image`, imageObj)
              .then((data) => {
                if (data.data.success) {
                  alert("Image has been successfully uploaded using firebase storage");
                }
              })
              .catch((err) => {
                alert("Error while uploading image using firebase storage")
              })
          })
        })
    }
  


  // saveForm=()=> {
  //   return(
  //     <div>
  //       <form onSubmit={this.handleSaveSubmit}>
  //         <p>
  //           <label>Image Name: </label>
  //           <input type="text" name="image_name" value={this.state.image_name} onChange={this.handleChange}/>
  //           <input type="submit" value="Save"/>
  //         </p>
  //       </form>
  //     </div>
  //   )
  // }


  render() {
    const { first_name, last_name, email, message } = this.state

      const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
      }
 

    return (
      <div className="container bg">
        <div className="container">
          <div className="jumbotron">
            <h1 className="display-4">Dear Customer</h1>
          </div>
        </div>
        <h5 className="title">Please complete your information</h5>
        <div className="input-group mb-3">
                
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
         
          <div className="container">
              <Webcam
                audio={false}
                height={240}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={320}
                videoConstraints={videoConstraints}
              />
              <div className="button-container">
              <span><button onClick={this.capture_one}>Capture Photo 1</button></span>
              <span><button onClick={this.capture_two}>Capture Photo 2</button></span>
              </div>
              {this.state.imageData_one ?
                <div>
                  <p>
                    <img src={this.state.imageData_one} alt=""/>
                  </p>
                  {/* <span><button onClick={this.onClickRetake_one}>Retake?</button></span>
                  <span><button onClick={this.handleSaveSubmit}>Save</button></span> */}
                  {/* {this.state.saveImage ? this.saveForm() : null} */}
                </div>
              : null}
              {this.state.imageData_two ?
                <div>
                  <p>
                    <img src={this.state.imageData_two} alt=""/>
                  </p>
                  {/* <span><button onClick={this.onClickRetake_two}>Retake?</button></span> */}
                  <span><button onClick={this.handleSaveSubmit}>Save</button></span>
                  {/* {this.state.saveImage ? this.saveForm() : null} */}
                </div>
              : null}
            
          </div>
        </div>
        </div>
    )
  }
}

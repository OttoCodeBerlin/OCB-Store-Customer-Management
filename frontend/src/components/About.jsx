import React, { Component } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
    


export default class About extends Component {

  handleBack= () => {
    this.props.history.goBack()
  }
  render() {

  return (
    <div>
  <Navbar />

    <div className="container bg" >
      <div className="container" style={{ position: 'relative'}}>
      <ul className="list-group" style={{ marginTop: '90px', position: 'absolute'}}>
        <li className="list-group-item disabled" >Copyright ©2018 OttoCodeBerlin</li>
        <li className="list-group-item">
            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in all
            copies or substantial portions of the Software.
            <br/>
            <br/>
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.</li>
        <li className="list-group-item">This app is using Bootstrap - <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">SEE LICENSE</a></li>
        <li className="list-group-item">Photo by <a href="https://unsplash.com/@blakewisz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"  target="_blank" rel="noopener noreferrer"> Blake Wisz </a> on <a href="https://unsplash.com/s/photos/store?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"  target="_blank" rel="noopener noreferrer">Unsplash</a>
        </li>
        <li className="list-group-item">Photo by <a href="https://unsplash.com/@christiannkoepke?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"  target="_blank" rel="noopener noreferrer"> Christiann Koepke </a> on <a href="https://unsplash.com/s/photos/store?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"  target="_blank" rel="noopener noreferrer">Unsplash</a>
        </li>
        <li className="list-group-item">Logo by <a href="http://freelogodesign.org" target="_blank" rel="noopener noreferrer">freelogodesign.org</a></li>
        <button className="btn btn-primary mt-2" onClick={this.handleBack}>Back</button>
      </ul>
      
    </div>
    </div>
    <Footer />
    </div>
  )
}}




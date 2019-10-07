import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'

export default class About extends Component {

  handleBack= () => {
    this.props.history.goBack()
  }
  render() {

  return (
    <div>
      <h1 className="mt-5">About.</h1>
      <button className="btn btn-secondary" onClick={this.handleBack}>Back</button>
    </div>
  )
}}




import React, { Component } from 'react'

class Buttons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftButtonDisable: true,
      rightButtonDisable: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  //this allows one to access the props that are coming from a parent component, and do work with it prior to rendering the page
  componentWillReceiveProps(nextProps) {
    let currentPage = nextProps.currentPage
    if (currentPage === 0) {
      this.setState({
        leftButtonDisable: true
      })
    } else if (currentPage === 9) {
      this.setState({
        rightButtonDisable: true
      })
    } else {
      this.setState({
        leftButtonDisable: false,
        rightButtonDisable: false
      })
    }
  }

  //when button is clicked set value sent to parent component to either -1 to decrement or +1 to increment
  handleChange(e) {
    let value = 0
    if (e.target.value === 'left') {
      value--
      this.props.onPageChange(value)
    } else {
      value++
      this.props.onPageChange(value)
    }
  }

  render() {
    return (
      <div className="buttons">
        <button
          className="btn"
          value="left"
          disabled={this.state.leftButtonDisable}
          onClick={this.handleChange}
        >
          ◀
        </button>
        <button
          className="btn"
          value="right"
          disabled={this.state.rightButtonDisable}
          onClick={this.handleChange}
        >
          ▶
        </button>
      </div>
    )
  }
}

export default Buttons

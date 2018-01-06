import React, { Component } from 'react';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftButtonDisable: true,
      rightButtonDisable: false
    };
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    let currentPage = nextProps.currentPage,
      disableButton = ""
    console.log(currentPage)
    if (currentPage === 0) {
      disableButton = "left"
    }
    if (currentPage === 9) {
      disableButton = "right"
    }
    if (disableButton === "left") {
      this.setState({
        currentPage,
        leftButtonDisable: true
      })
    } else if (disableButton === "right") {
      this.setState({
        currentPage,
        rightButtonDisable: true
      })
    } else {
      this.setState({
        leftButtonDisable: false,
        rightButtonDisable: false,
        currentPage
      })
    }
  }

  handleChange(e) {
    let value = 0
    if (e.target.value === "left") {
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
        <button className="btn" value="left" disabled={this.state.leftButtonDisable} onClick={this.handleChange}>◀</button>
        <button className="btn" value="right" disabled={this.state.rightButtonDisable} onClick={this.handleChange}>▶</button>
      </div>
    );
  }
}

export default Buttons;

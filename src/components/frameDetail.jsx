import React, { Component } from "react"
import Axios from "axios"
import Detail from "./detail"

class FrameDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      csv: [],
      loading: true,
    }
  }

  componentWillMount() {
    Axios.get(this.props.csv)
      .then(res => {
        this.setState({ csv: res["data"], loading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (this.state.loading) {
      return <section />
    } else {
      return <Detail data={this.state.csv[this.props.selected]} />
    }
  }
}

export default FrameDetail

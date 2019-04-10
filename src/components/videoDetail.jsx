import React, { Component } from "react"
import Axios from "axios"
import FrameDetail from "./frameDetail"
import { Button, withStyles } from "@material-ui/core"
import Frame from "./frame"

const styles = {
  button: {
    marginBottom: "1%",
    color: "white",
    borderColor: "white",
    border: "solid",
    marginRight: "1%",
  },
}

class VideoDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url_list: [],
      csv_path: null,
      loading: true,
      select_index: 0,
    }
  }

  componentDidMount() {
    Axios.get("https://bf9f4f26.ngrok.io/data", {
      params: {
        id: this.props.id,
      },
    })
      .then(res => {
        let data = res["data"]
        data.sort((a, b) => {
          let aArr = parseInt(
            a
              .split("/")[2]
              .split(".")[0]
              .split("_")[3]
          )
          let bArr = parseInt(
            b
              .split("/")[2]
              .split(".")[0]
              .split("_")[3]
          )
          return aArr - bArr
        })
        let urls = data.map(item => "https://bf9f4f26.ngrok.io/" + item)
        this.setState({
          url_list: urls,
          csv_path:
            "https://bf9f4f26.ngrok.io/static/" + this.props.id + ".csv",
          loading: false,
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  previousFrame = () => {
    if (this.state.select_index > 0) {
      this.setState({ select_index: this.state.select_index - 1 })
    }
  }

  nextFrame = () => {
    if (this.state.select_index < this.state.url_list.length - 1) {
      this.setState({ select_index: this.state.select_index + 1 })
    }
  }

  render() {
    return (
      <section>
        <section
          style={{
            paddingLeft: "45vw",
            paddingTop: "20vh",
            marginBottom: "1%",
          }}
        >
          <div
            style={{
              height: "auto",
              width: "auto",
              display: "inline-flex",
            }}
          >
            <Button
              variant="outlined"
              className={this.props.classes.button}
              onClick={() => this.previousFrame()}
            >
              Previous
            </Button>
            <Button
              variant="outlined"
              className={this.props.classes.button}
              onClick={() => this.nextFrame()}
            >
              Next
            </Button>
          </div>
        </section>
        {!this.state.loading && (
          <div className={`frame-container`}>
            <div
              className="frame-wrapper"
              style={{
                transform: `translatex(-${this.state.select_index *
                  (100 / this.state.url_list.length)}%)`,
              }}
            >
              {this.state.url_list.map(url => (
                <Frame key={url} image={url} />
              ))}
            </div>
          </div>
        )}
        {!this.state.loading && (
          <FrameDetail
            selected={this.state.select_index}
            csv={this.state.csv_path}
          />
        )}
      </section>
    )
  }
}

export default withStyles(styles)(VideoDetail)

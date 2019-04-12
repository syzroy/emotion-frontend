import React, { Component } from "react"
import Axios from "axios"
import FrameDetail from "./frameDetail"
import { Button, withStyles } from "@material-ui/core"
import Frame from "./frame"
import EmotionDetail from "./emotionDetail"

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
      frame_paths: [],
    }
  }

  componentDidMount() {
    Axios.get("http://127.0.0.1:5000/data", {
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
        let urls = data.map(item => "http://127.0.0.1:5000/" + item)
        this.setState({
          url_list: urls,
          csv_path: "http://127.0.0.1:5000/static/" + this.props.id + ".csv",
          loading: false,
          frame_paths: data,
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
        <section
          style={{
            display: "inline-flex",
            width: "100vw",
            justifyContent: `space-around`,
          }}
        >
          {!this.state.loading && (
            <FrameDetail
              selected={this.state.select_index}
              csv={this.state.csv_path}
            />
          )}
          {!this.state.loading && (
            <EmotionDetail
              id={this.props.id}
              frame={this.state.frame_paths[this.state.select_index]}
            />
          )}
        </section>
      </section>
    )
  }
}

export default withStyles(styles)(VideoDetail)

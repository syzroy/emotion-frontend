import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import Webcam from "react-webcam"
import io from "socket.io-client"
import AUTable from "../components/auTable"
import SEO from "../components/seo"
import Image from "../components/image"
const uuidv4 = require("uuid/v4")

class CameraPage extends Component {
  constructor(props) {
    super(props)
    this.promise = Promise.resolve(true)
    this.state = {
      promise: Promise.resolve(true),
      socket: io.connect("https://15065c52.ngrok.io"),
      width: 0,
      height: 0,
      classification: {},
      regression: {},
      file_id: "",
    }
    this.state.socket.on("connect", () => {
      console.log("connected")
    })
    this.state.socket.on("message", message => {
      let data = JSON.parse(message[1])
      let regressionData = {}
      let classificationData = {}
      Object.keys(data).forEach(key => {
        if (key.includes("Regression")) {
          regressionData[key] = data[key]
        } else {
          classificationData[key] = data[key]
        }
      })
      this.setState({
        file_id: message[0],
        regression: regressionData,
        classification: classificationData,
      })
    })
  }

  setReference = webcam => {
    this.webcam = webcam
  }

  startTimer = () => {
    this.getAnalysis()
    this.timer = setInterval(() => this.getAnalysis(), 3000)
  }

  clearTimer = () => {
    clearInterval(this.timer)
  }

  getAnalysis = () => {
    if (this.webcam) {
      this.promise = this.promise.then(() => {
        return new Promise(resolve => {
          let image = this.webcam.getScreenshot()
          console.log(image)
          this.state.socket.send(image, uuidv4())
          resolve()
        })
      })
    }
  }

  render() {
    return (
      <div style={{ display: "inline-flex" }}>
        <SEO title="Camera" />
        <Image />
        <section style={{ marginRight: "1%" }}>
          <Webcam
            audio={false}
            ref={this.setReference}
            screenshotFormat="image/jpeg"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </section>
        <section style={{ width: "50vw" }}>
          <section>
            <Button
              variant="contained"
              color="primary"
              onClick={this.startTimer}
            >
              Start Analysis
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearTimer}
            >
              Stop Analysis
            </Button>
          </section>
          <section style={{ width: "50%" }}>
            <AUTable id={this.state.file_id} data={this.state.classification} name={'Action Unit Classification'} />
          </section>
        </section>
      </div>
    )
  }
}

export default CameraPage

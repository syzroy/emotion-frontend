import Button from "@material-ui/core/Button"
import React, { Component } from "react"
import Webcam from "react-webcam"
import io from "socket.io-client"
import SEO from "../components/seo"
import Image from "../components/image"
import Table from "../components/table"
import { Link } from "gatsby"
const uuidv4 = require("uuid/v4")

class CameraPage extends Component {
  constructor(props) {
    super(props)
    this.promise = Promise.resolve(true)
    this.state = {
      promise: Promise.resolve(true),
      socket: io.connect("http://127.0.0.1:5000/"),
      width: 0,
      height: 0,
      classification: {},
      fer: {},
      file_id: "",
    }
    this.state.socket.on("connect", () => {
      console.log("connected")
    })
    this.state.socket.on("message", message => {
      let data = JSON.parse(message[1])
      let labels = message[3]
      let fer = message[2]
      let result = {}
      for (let i = 0; i < 8; i++) {
        result[labels[i]] = fer[i]
      }
      this.setState({
        file_id: message[0],
        classification: data,
        fer: result,
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
          this.state.socket.send(image, uuidv4())
          resolve()
        })
      })
    }
  }

  render() {
    return (
      <div>
        <SEO title="Camera" />
        <Image />
        <div style={{ marginTop: "1%", marginBottom: "1%" }}>
          <section style={{ textAlign: "center" }}>
            <Link
              to="/"
              className="button"
              style={{
                background: "#9b59b6",
                color: "white",
                margin: `0 auto`,
                border: "none",
                boxShadow: `0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)`,
              }}
            >
              Back to Home
            </Link>
          </section>
        </div>
        <div style={{ display: "inline-flex" }}>
          <section style={{ marginRight: "1%", width: "50vw" }}>
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
            <section style={{ marginBottom: "1%", textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.startTimer}
                style={{ marginRight: "5%" }}
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
            <section
              style={{
                display: "inline-flex",
                width: "100%",
                justifyContent: "space-evenly",
                marginRight: "1%",
              }}
            >
              <Table
                data={this.state.classification}
                name={"Action Unit Classification"}
              />

              <Table data={this.state.fer} name={"Emotion Prediction"} />
            </section>
          </section>
        </div>
      </div>
    )
  }
}

export default CameraPage

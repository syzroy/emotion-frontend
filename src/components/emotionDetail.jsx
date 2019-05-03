import React, { Component } from "react"
import Axios from "axios"
import { Card, CardContent, Typography, withStyles } from "@material-ui/core"

const styles = {
  card: {
    height: "auto",
    marginBottom: "1%",
    // width: "45%",
    maxHeight: "30vh",
    overflow: "auto",
    background:
      "linear-gradient(rgba(88, 90, 90, 0.7), rgba(189, 195, 199, 0.7))",
  },
  top: {
    color: "white",
  },
}

class EmotionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: [],
    }
  }

  render() {
    Axios.get("https://57fdabf5.ngrok.io/emotion", {
      params: {
        id: this.props.id,
        frame: this.props.frame,
      },
    })
      .then(res => {
        let results = res["data"]
        let data = results.data
        let labels = results.labels
        let emotion = []
        for (let index = 0; index < 8; index++) {
          emotion.push({
            i: index,
            key: labels[index],
            value: data[index],
          })
        }
        emotion.sort((a, b) => b.value - a.value)
        this.setState({ detail: emotion })
      })
      .catch(err => {
        console.log(err)
      })

    if (this.state.detail === undefined || this.state.detail === []) {
      return <div />
    } else {
      return (
        <section>
          <Card className={this.props.classes.card}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                className={this.props.classes.top}
              >
                Emotion Prediction
              </Typography>

              {this.state.detail.map(e => (
                <Typography
                  variant="h6"
                  component="h2"
                  key={e.i}
                  className={this.props.classes.top}
                >
                  {e.key}: {e.value}
                </Typography>
              ))}
            </CardContent>
          </Card>
        </section>
      )
    }
  }
}

export default withStyles(styles)(EmotionDetail)

import React, { Component } from "react"
import ListTable from "../components/listTable"
import { Button } from "@material-ui/core"
import Image from "../components/image"
import SEO from "../components/seo"
import VideoDetail from "../components/videoDetail"
import { Link } from "gatsby"

class VideoPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: null,
    }
  }

  select = id => {
    this.setState({ selected: id })
  }

  render() {
    if (this.state.selected === null) {
      return (
        <section>
          <SEO title="Video Upload" />
          <Image />
          <section
            style={{
              paddingTop: "20vh",
              paddingLeft: "15vw",
              marginBottom: "2%",
            }}
          >
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
          <section style={{ paddingLeft: "15vw" }}>
            <Button
              variant="outlined"
              component="span"
              style={{
                marginBottom: "1%",
                color: "white",
                borderColor: "white",
                border: "solid",
              }}
            >
              Upload
            </Button>
          </section>

          <section
            style={{
              paddingLeft: "15vw",
            }}
          >
            <ListTable select={this.select} />
          </section>
        </section>
      )
    } else {
      return (
        <section>
          <SEO title="Video Detail" />
          <Image />
          <VideoDetail id={this.state.selected} />
        </section>
      )
    }
  }
}

export default VideoPage

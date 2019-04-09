import React, { Component } from "react"
import ListTable from "../components/listTable"
import { Button } from "@material-ui/core"
import Image from "../components/image"
import SEO from "../components/seo"

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
              paddingTop: "25vh",
              paddingLeft: "15vw",
            }}
          >
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
          
        </section>
      )
    }
  }
}

export default VideoPage

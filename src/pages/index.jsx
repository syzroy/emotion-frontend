import React from "react"
import { Link } from "gatsby"
import Image from "../components/image"
import "../styles/layout.css"
import SEO from "../components/seo"

const IndexPage = () => (
  <section>
    <Image />
    <SEO title="Home" />
    <div style={{ paddingTop: "20vh", paddingLeft: "10vw" }}>
      <h1
        style={{
          userSelect: "none",
        }}
      >
        Emotion Analysis
      </h1>
    </div>
    <div style={{ paddingLeft: "10vw", paddingTop: "5vh" }}>
      <Link to="/" className="button">
        Go to Camera
      </Link>
      <Link to="/video" className="button">
        Go to Video
      </Link>
    </div>
  </section>
)

export default IndexPage

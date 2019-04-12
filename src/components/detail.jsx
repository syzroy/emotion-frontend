import React from "react"
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

const Detail = props => {
  const data = props.data
  const classes = props.classes
  let json = JSON.parse(data)
  let nonZero = []
  let frame = json.frame
  for (let key in json) {
    if (key !== "frame" && json[key] > 0) {
      nonZero.push({
        label: key,
        value: json[key],
      })
    }
  }
  let i = 0
  let indexed = nonZero.map(e => ({
    index: i++,
    label: e.label,
    value: e.value,
  }))
  return (
    <section>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.top}>
            Frame Number: {frame}
          </Typography>

          {indexed.map(e => (
            <Typography
              variant="h6"
              component="h2"
              key={e.index}
              className={classes.top}
            >
              {e.label}: {e.value}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default withStyles(styles)(Detail)

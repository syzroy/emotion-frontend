import React from "react"
import { withStyles, Card, CardContent, Typography } from "@material-ui/core"

const styles = {
  card: {
    height: "auto",
    maxHeight: "65vh",
    overflow: "auto",
    background:
      "linear-gradient(rgba(88, 90, 90, 0.7), rgba(189, 195, 199, 0.7))",
  },
  top: {
    color: "white",
  },
}

const Table = props => {
  const data = props.data
  const name = props.name
  const classes = props.classes
  let nonZero = []
  let index = 0
  for (let key in data) {
    if (data[key] > 0) {
      nonZero.push({
        index: index++,
        key: key,
        value: data[key],
      })
    }
  }
  nonZero.sort((a, b) => b.value - a.value)
  return (
    <section style={{ width: "47%" }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.top}
            variant="h5"
            component="h2"
            style={{ marginBottom: "1%" }}
          >
            {name}
          </Typography>
          {nonZero.map(e => (
            <Typography
              variant="h6"
              component="h2"
              key={e.index}
              className={classes.top}
            >
              {e.key}: {parseFloat(e.value)}
            </Typography>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}

export default withStyles(styles)(Table)

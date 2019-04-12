import React from "react"
import { withStyles, Card, CardContent, Typography } from "@material-ui/core"

const styles = {
  card: {
    height: "auto",
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

const Table = props => {
  const data = props.data
  const name = props.name
  const classes = props.classes
  return (
    <section style={{ width: "47%" }}>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.top} variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </section>
  )
}

export default withStyles(styles)(Table)

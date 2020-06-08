import React from "react";
import { Link } from "gatsby";
import { format } from "date-fns";
import { getBlogUrl } from "../lib/helpers";
import { makeStyles } from "@material-ui/core/styles";
import PortableText from "./portableText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
});

export default function BlogPostPreview(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        to={getBlogUrl(props.publishedAt, props.slug.current)}
      >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {props.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {format(props.publishedAt, "MMMM Do, YYYY")}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {props._rawExcerpt && <PortableText blocks={props._rawExcerpt} />}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Link>
    </Grid>
  );
}

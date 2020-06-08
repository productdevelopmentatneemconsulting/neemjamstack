import React from "react";
import { Link } from "gatsby";
import { format } from "date-fns";
import { getHowToUrl } from "../lib/helpers";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Img from "gatsby-image";
import Hidden from "@material-ui/core/Hidden";

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

export default function FeaturedPost(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        to={getHowToUrl(props.slug.current)}
      >
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {props.headline}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {format(props.publishedAt, "MMMM Do, YYYY")}
              </Typography>
              {/* <Typography variant="subtitle1" paragraph>
                {post.description}
              </Typography> */}
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
          </div>
          <Hidden xsDown>
            <Img
              className={classes.cardMedia}
              fluid={{
                ...props.heroImage.asset.fluid,
                sizes:
                  "(max-width: 512px) 10vw, (max-width: 768px) 15vw, (max-width: 1280px) 20vw, (max-width: 1680px) 25vw, 30vw"
              }}
              alt={props.heroImage.alt}
            />
          </Hidden>
        </Card>
      </Link>
    </Grid>
  );
}

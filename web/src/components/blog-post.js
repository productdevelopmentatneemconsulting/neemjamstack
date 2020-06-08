import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import BlogContent from "./blog-content";
import MainFeaturedBlogPost from "./main-featured-blogpost";
import BlogSidebar from "./blog-sidebar.js";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.spacing(10)
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const BlogPost = ({ _rawBody, title, mainImage, publishedAt }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.mainContainer}>
        <main>
          <MainFeaturedBlogPost mainImage={mainImage} title={title} />

          <Grid container spacing={5} className={classes.mainGrid}>
            <BlogContent _rawBody={_rawBody} title={title} />
            <BlogSidebar publishedAt={publishedAt} />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
};

export default BlogPost;

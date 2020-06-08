import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Main from "./article-content";
import MainFeaturedPost from "./main-featured-article";
import Sidebar from "./sidebar";

const useStyles = makeStyles(theme => ({
  mainContainer: {
    marginTop: theme.spacing(10)
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  }
}));

const Article = ({ heroImage, headline, subheading, productList, tags, _rawHowTobody }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.mainContainer}>
        <main>
          <MainFeaturedPost heroImage={heroImage} headline={headline} subheading={subheading} />
          {/* <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main productList={productList} _rawHowTobody={_rawHowTobody} />
            <Sidebar tags={tags} />
          </Grid>
        </main>
      </Container>
    </React.Fragment>
  );
};

export default Article;

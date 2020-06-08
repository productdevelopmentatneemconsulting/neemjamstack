import React from "react";
import Grid from "@material-ui/core/Grid";
import FeaturedPost from "./featured-article";

const ArticlePreviewList = props => {
  return (
    <Grid container spacing={4}>
      {props.nodes.map(post => (
        <FeaturedPost key={post.id} {...post} />
      ))}
    </Grid>
  );
};

export default ArticlePreviewList;

import React from "react";
import Grid from "@material-ui/core/Grid";
import BlogPostPreview from "./blog-post-preview";

const BlogPreviewList = props => {
  return (
    <Grid container spacing={4}>
      {props.nodes.map(post => (
        <BlogPostPreview key={post.id} {...post} />
      ))}
    </Grid>
  );
};

export default BlogPreviewList;

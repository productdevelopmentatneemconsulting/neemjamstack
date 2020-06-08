import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import PortableText from "./portableText";

const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  }
}));

const BlogContent = ({ title, _rawBody }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {_rawBody && <PortableText blocks={_rawBody} />}
      </Typography>

      <Divider />
    </Grid>
  );
};

export default BlogContent;

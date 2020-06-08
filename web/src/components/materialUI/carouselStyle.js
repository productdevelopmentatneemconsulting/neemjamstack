import { container } from "./material-react";

const carouselStyle = {
  section: {
    padding: "70px 0"
  },
  container,
  marginAuto: {
    marginLeft: "auto !important",
    marginRight: "auto !important"
  },
  root: {
    display: "flex",
    maxHeight: 350
  },
  details: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10%",
    marginLeft: "5%"
  },
  content: {
    flex: "1 0 auto"
  },
  headline: {
    padding: "5%",
    background: "aquamarine"
  },
  cover: {
    width: "50%"
  }
};

export default carouselStyle;

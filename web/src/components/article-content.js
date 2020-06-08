import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { getFluidGatsbyImage } from "gatsby-source-sanity";
import BlockContent from "@sanity/block-content-to-react";
import EmblaCarousel from "./embelaCarousel";
import Img from "gatsby-image";

const useStyles = makeStyles(theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  richText: {
    paddingTop: 40,
    marginBottom: 32,
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      background: "#fed760",
      height: 20,
      right: 0,
      top: 0,
      width: "100vw",
      zIndex: -1
    },
    "& h2": {
      fontSize: "1.875rem",
      fontWeight: 700,
      margin: "50px 20px 20px 0",
      position: "relative",
      background: theme.palette.common.white,
      padding: "16px 16px 0 16px",
      [theme.breakpoints.up("md")]: {
        fontSize: "2.25rem"
      },

      "&:before": {
        content: '""',
        position: "absolute",
        background: theme.palette.common.black,
        right: -20,
        top: -20,
        width: "100vw",
        zIndex: -1,
        backgroundColor: "#fed760",
        height: "calc(100% - .15em)"
      }
    },
    "& h3": {
      fontSize: "1.5rem",
      fontWeight: 400,
      margin: 0,
      marginBottom: 8,
      [theme.breakpoints.up("md")]: {
        fontSize: "1.875rem"
      }
    },
    "& p": {
      fontSize: ".875rem",
      margin: 0,
      marginBottom: 16,
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem"
      }
    },
    "& div": {
      margin: 0,
      marginBottom: 16
    },
    "& a": {
      color: theme.palette.common.black,
      position: "relative",
      textDecoration: "none",
      display: "inline-block",
      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: 2,
        backgroundColor: "#FF3366",
        transition: "all 0.3s ease-in-out"
      },
      "&:after": {
        content: '""',
        position: "absolute",
        left: 0,
        right: "100%",
        bottom: 0,
        height: 2,
        backgroundColor: theme.palette.common.black,
        transition: "all 0.3s ease-in-out"
      },
      "&:hover:after": {
        right: 0
      }
    },
    "& figure": {
      margin: 0,
      marginBottom: 16
    },
    "& .c-product": {
      marginBottom: 30,
      marginTop: 30,
      textAlign: "center"
    },
    "& .c-product__name": {
      fontSize: ".875rem",
      fontWeight: 700,
      backgroundImage: "linear-gradient(120deg,#b8f0c0 0%,#b8f0c0 100%)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% .1875rem",
      backgroundPosition: "0 100%",
      display: "inline-flex",
      paddingBottom: 3,
      [theme.breakpoints.up("md")]: {
        fontSize: "1.125rem"
      }
    },
    "& .c-product__tagline": {
      marginBottom: 10,
      "& span": {
        fontSize: "1.125rem",
        fontWeight: 700,
        background: "linear-gradient(to bottom,#fff 40%,#f8e6de 5%,#f8e6de 95%)",
        display: "inline-block"
      }
    },
    "& .c-product__image": {
      width: 250,
      margin: "auto"
    },
    "& .c-product__link": {
      "&:before, &:after": {
        display: "none"
      }
    }
  }
}));

const sanityConfig = { projectId: "e1mdz151", dataset: "production" };

const blockTypeDefaultSerializers = {
  types: {
    block: props => {
      return <>{props.children}</>;
    },
    step: ({ node: { directions, imageName, instructionName } }) => {
      const fluidProps = getFluidGatsbyImage(imageName.asset._id, { maxWidth: 800 }, sanityConfig);

      return (
        <>
          <BlockContent blocks={instructionName} />
          <BlockContent blocks={directions} />
          <figure>
            <Img fluid={fluidProps} alt={""} />
          </figure>
        </>
      );
    },
    figure: ({ node }) => {
      const fluidProps = getFluidGatsbyImage(node.asset._id, { maxWidth: 800 }, sanityConfig);

      return (
        <figure>
          <Img fluid={fluidProps} alt={node.alt} />
          {node.caption && <figcaption>{node.caption}</figcaption>}
        </figure>
      );
    },
    productReference: props => {
      const node = props.node;

      if (!node.product) {
        return null;
      }

      // const fluidProps = getFluidGatsbyImage(
      //   node.product.image.asset._id,
      //   { maxWidth: 250 },
      //   sanityConfig
      // );
      return (
        <div className="c-product">
          <div className="c-product__image">
            {/* <figure>
                <Img fluid={fluidProps} alt={""} />
              </figure> */}
          </div>
          <p className="c-product__tagline">
            <span>{node.product && node.product.tagLine}</span>
          </p>
          <h3 className="c-product__name">{node.product && node.product.name}</h3>
        </div>
      );
    }
  }
};

const Main = ({ productList, _rawHowTobody }) => {
  console.log("_rawHowTobody", _rawHowTobody);
  const classes = useStyles();

  return (
    <Grid item xs={12} md={8}>
      <Divider />
      <section className={classes.richText}>
        <BlockContent blocks={_rawHowTobody} serializers={blockTypeDefaultSerializers} />
      </section>
      <EmblaCarousel>
        {productList.map(p => (
          <div key={p.productName} className={classes.markdown}>
            <Img
              fluid={{
                ...p.productImage.asset.fluid,
                sizes:
                  "(max-width: 512px) 20vw, (max-width: 768px) 35vw, (max-width: 1280px) 50vw, (max-width: 1680px) 70vw, 90vw"
              }}
              alt={p.productImage.asset.alt}
            />
            <div>{p.productName}</div>
          </div>
        ))}
      </EmblaCarousel>
    </Grid>
  );
};

export default Main;

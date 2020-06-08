import React from "react";
import { graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Container from "../components/container";
import Card from "@material-ui/core/Card";
import EmblaCarousel from "../components/embelaCarousel";
import EmblaTileCarousel from "../components/embelaTileCarousel";
import Img from "gatsby-image";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import styles from "../components/materialUI/carouselStyle";

const useStyles = makeStyles(styles);

export const query = graphql`
  query HomePageQuery {
    heroSlider: sanityArticleSlider(
      sliderName: {}
      slideType: { sliderName: { eq: "Hero Slider - Type 1" } }
    ) {
      sliderName
      slides {
        ... on SanityFeatureArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
        ... on SanityGalleryArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
        ... on SanityHowToArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
      }
    }
    tileSlider: sanityArticleSlider(
      sliderName: {}
      slideType: { sliderName: { eq: "Tile Slider - Type 1" } }
    ) {
      sliderName
      slides {
        ... on SanityFeatureArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
        ... on SanityGalleryArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
        ... on SanityHowToArticle {
          id
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          headline
          slug {
            current
          }
        }
      }
    }
  }
`;

const LandingPage = ({ data }) => {
  const classes = useStyles();
  console.log("data", data);
  if (data.heroSlider.slides == undefined && data.tileSlider.slides == undefined) {
    return null;
  } else {
    return (
      <Layout>
        <SEO title="Home-Page" />

        <Card>
          <EmblaCarousel>
            {data.heroSlider.slides.map(slide => {
              return (
                <div className={classes.root} key={slide.id}>
                  <Img
                    loading={"eager"}
                    fluid={{
                      ...slide.heroImage.asset.fluid,
                      sizes:
                        "(max-width: 512px) 20vw, (max-width: 768px) 35vw, (max-width: 1280px) 50vw, (max-width: 1680px) 70vw, 90vw"
                    }}
                    className={classes.cover}
                    alt={slide.heroImage.alt}
                  />
                  <div className={classes.details}>
                    <div className={classes.content}>
                      <h3 className={classes.headline}>{slide.headline}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </EmblaCarousel>
        </Card>
        <Container>
          <Card>
            <EmblaTileCarousel>
              {data.tileSlider.slides.map(slide => {
                return (
                  <div key={slide.id}>
                    <Img
                      loading={"eager"}
                      fluid={{
                        ...slide.heroImage.asset.fluid,
                        sizes:
                          "(max-width: 512px) 20vw, (max-width: 768px) 35vw, (max-width: 1280px) 50vw, (max-width: 1680px) 70vw, 90vw"
                      }}
                      alt={slide.heroImage.alt}
                    />
                    <span>{slide.headline}</span>
                  </div>
                );
              })}
            </EmblaTileCarousel>
          </Card>
        </Container>
      </Layout>
    );
  }
};

export default LandingPage;

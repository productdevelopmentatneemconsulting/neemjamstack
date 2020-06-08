import React from "react";
import { graphql } from "gatsby";
import ArticlePreviewList from "../components/article-list";
import { mapEdgesToNodes } from "../lib/helpers";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  fragment SanityMainImage on SanityFigure {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query {
    allHowTo: allSanityHowToArticle {
      edges {
        node {
          headline
          subheading
          id
          slug {
            current
          }
          heroImage {
            asset {
              fluid {
                ...GatsbySanityImageFluid_withWebp
              }
            }
            alt
          }
          publishedAt
        }
      }
    }
  }
`;

const IndexPage = ({ data }) => {
  const postNodes = data && data.allHowTo && mapEdgesToNodes(data.allHowTo);

  return (
    <Layout>
      <SEO title="How to article list" />
      <Container>
        {postNodes && postNodes.length > 0 && <ArticlePreviewList nodes={postNodes} />}
      </Container>
    </Layout>
  );
};

export default IndexPage;

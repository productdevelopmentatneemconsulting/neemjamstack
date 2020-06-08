import { graphql, StaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
    navbar: allSanityNavBar(filter: { name: { eq: "Header" } }) {
      edges {
        node {
          navItems {
            navL1 {
              name
            }
            navL2 {
              name
            }
          }
        }
      }
    }
  }
`;

function LayoutContainer(props) {
  return (
    <StaticQuery
      query={query}
      render={data => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the Studio at http://localhost:3333 and some content in "Site settings"'
          );
        }
        return <Layout {...props} siteTitle={data.site.title} navlinks={data.navbar} />;
      }}
    />
  );
}

export default LayoutContainer;

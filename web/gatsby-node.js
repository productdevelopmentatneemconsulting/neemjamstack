const path = require("path");
const { isFuture } = require("date-fns");
const { format } = require("date-fns");

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("./src/templates/blog-post.js");
  const howToArticleTemplate = path.resolve("./src/templates/how-to-post.js");
  const res = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  const res1 = await graphql(`
    {
      allSanityHowToArticle(
        filter: { slug: { current: { ne: "null" } }, publishedAt: { ne: "null" }, id: {} }
      ) {
        edges {
          node {
            id
            slug {
              current
            }
            tags {
              tagName
            }
          }
        }
      }
    }
  `);

  if (res.errors) throw res.errors;
  // Create blog post pages
  res.data.allSanityPost.edges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach((edge, index) => {
      const dateSegment = format(edge.node.publishedAt, "YYYY/MM");
      createPage({
        component: blogTemplate,
        path: `/blog/${dateSegment}/${edge.node.slug.current}`,
        context: {
          id: edge.node.id,
          slug: edge.node.slug
        }
      });
    });

  if (res1.errors) throw res1.errors;
  console.log("tag", res1);
  // Create howTo article pages
  res1.data.allSanityHowToArticle.edges.forEach((edge, index) => {
    const tagVal = [];
    const { tags = [] } = edge.node;
    edge.node.tags.forEach((tag, index) => {
      tagVal.push(tag.tagName);
    });
    console.log("tagVal",tagVal)
    createPage({
      component: howToArticleTemplate,
      path: `/article/howto/${edge.node.slug.current}`,
      context: {
        id: edge.node.id,
        slug: edge.node.slug,
        tag: tagVal
      }
    });
  });
};

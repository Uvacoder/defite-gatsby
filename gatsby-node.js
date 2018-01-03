const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              html
              frontmatter {
                templateKey
                path
                date
                title
              }
            }
          }
        }
      }
    `
).then(result => {
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        const templateName = String(node.frontmatter.templateKey);

        createPage({
          path: node.frontmatter.path,
          component: path.resolve(`./src/templates/${templateName}/${templateName}.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
          },
        })
      })
      resolve()
    })
  })
}

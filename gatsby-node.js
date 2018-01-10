const path = require('path')
const fs = require('fs-extra')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onPostBuild = () => {
  console.log('Copying images for NetlifyCMS');
  fs.copySync(
    path.join(__dirname, '/src/images'),
    path.join(__dirname, '/public/images')
  );
};

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
          component: path.resolve(`./src/templates/${templateName}/${templateName}.js`)
        })
      })
      resolve()
    })
  })
}

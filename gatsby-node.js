const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            site {
              siteMetadata {
                title
                author
              }
            }
            allMarkdownRemark {
              edges {
                node {
                  html
                  frontmatter {
                    templateKey
                    path
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.map(({ node }) => {
          const templateName = String(node.frontmatter.templateKey);
  
          createPage({
            path: node.frontmatter.path,
            context: {
              slug: node.fields.slug,
            },
            component: path.resolve(`./src/templates/${templateName}.js`)
          })
        })
        resolve()
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

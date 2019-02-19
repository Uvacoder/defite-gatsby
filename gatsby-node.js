const Promise = require('bluebird');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { supportedLanguages } = require('./i18n');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // Create index pages for all supported languages
    Object.keys(supportedLanguages).forEach(langKey => {
      createPage({
        path: langKey === 'ru' ? '/' : `/${langKey}/`,
        component: path.resolve('./src/templates/home.jsx'),
        context: {
          langKey,
        },
      });
    });

    resolve(
      graphql(`
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
                    langKey
                  }
                }
              }
            }
          }
        `)
        .then((result) => {
          if (result.errors) {
            /* eslint-disable no-console */
            console.log(result.errors);
            reject(result.errors);
          }

          result.data.allMarkdownRemark.edges.map(({ node }) => {

            if (!node.fields) {
                return;
            }

            const templateName = String(node.frontmatter.templateKey);

            return createPage({
              path: node.frontmatter.path,
              context: {
                slug: node.fields.slug,
                pageType: node.frontmatter.templateKey
              },
              component: path.resolve(`./src/templates/${templateName}.jsx`),
            });
          });
          resolve();
        }),
    );
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;

//   if (node.internal.type === 'MarkdownRemark') {
//     const value = createFilePath({ node, getNode });

//     createNodeField({
//       name: 'slug',
//       node,
//       value,
//     });
//   }
// };

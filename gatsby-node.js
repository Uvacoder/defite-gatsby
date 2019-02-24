const Promise = require('bluebird');
const path = require('path');

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions;

	return new Promise((resolve, reject) => {
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
        `).then((result) => {
				if (result.errors) {
					/* eslint-disable no-console */
					console.log(result.errors);
					reject(result.errors);
				}

				result.data.allMarkdownRemark.edges.map(({ node }) => {
					if (!node.fields) {
						return false;
					}

					const templateName = String(node.frontmatter.templateKey);
					const { langKey } = node.fields;

					return createPage({
						path: node.frontmatter.path,
						context: {
							slug: node.fields.slug,
							pageType: node.frontmatter.templateKey,
							langKey,
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

//     return createNodeField({
//       name: 'slug',
//       node,
//       value,
//     });
//   }
// };

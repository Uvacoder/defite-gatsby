const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	await graphql(`
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
		result.data.allMarkdownRemark.edges.map(({ node }) => {
			if (!node.fields) {
				return false;
			}

			const templateName = String(node.frontmatter.templateKey);
			const { langKey } = node.fields;

			return actions.createPage({
				path: node.frontmatter.path,
				context: {
					slug: node.fields.slug,
					pageType: node.frontmatter.templateKey,
					langKey,
				},
				component: path.resolve(`./src/templates/${templateName}.jsx`),
			});
		});
	});
};

const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	await graphql(`
        {
            site {
                siteMetadata {
                    title
                    author
                }
            }
            allMarkdownRemark(
                sort: { fields: [frontmatter___date], order: DESC }
                limit: 1000
              ) {
                edges {
                    node {
                        html
                        frontmatter {
                            templateKey
                            path
							title
							status
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
		// Create blog-list pages
		// const posts = result.data.allMarkdownRemark.edges;

		const posts = result.data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.templateKey === 'blog-post' && node.frontmatter.status !== 'draft');

		const postsPerPage = 2;
		const numPages = Math.ceil(posts.length / postsPerPage);
		Array.from({ length: numPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? '/blog' : `/blog/${i + 1}`,
				component: path.resolve('./src/templates/blog.jsx'),
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					langKey: 'ru',
				},
			});
		});

		// result.data.allMarkdownRemark.edges.map(({ node }) => {
		// 	if (!node.fields) {
		// 		return false;
		// 	}

		// 	const templateName = String(node.frontmatter.templateKey);
		// 	const { langKey } = node.fields;

		// 	if (templateName === 'blog') {
		// 		return createPage({
		// 			path: node.frontmatter.path,
		// 			context: {
		// 				slug: node.fields.slug,
		// 				pageType: node.frontmatter.templateKey,
		// 				langKey,
		// 			},
		// 			component: path.resolve(`./src/templates/${templateName}.jsx`),
		// 		});
		// 	}
		// });
	});
};

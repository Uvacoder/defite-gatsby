const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const blogPost = path.resolve('./src/templates/blog-post.jsx');

	await graphql(`
        {
            site {
                siteMetadata {
                    title
                    author
                }
            }
            allMarkdownRemark (
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
		// Create blog posts pages.
		const posts = result.data.allMarkdownRemark.edges.filter(({ node }) => node.frontmatter.templateKey === 'blog-post');

		posts.forEach((post, index) => {
			const previous = index === posts.length - 1 ? null : posts[index + 1].node;
			const next = index === 0 ? null : posts[index - 1].node;


			createPage({
				path: post.node.fields.slug,
				component: blogPost,
				context: {
					slug: post.node.fields.slug,
					previous,
					next,
					langKey: post.node.fields.langKey,
				},
			});
		});

		// Create blog post list pages
		const postsPerPage = 2;
		const numPages = Math.ceil(posts.length / postsPerPage);

		Array.from({ length: numPages }).forEach((_, i) => {
			createPage({
				path: i === 0 ? '/blog' : `blog/${i + 1}`,
				component: path.resolve('./src/templates/blog.jsx'),
				context: {
					limit: postsPerPage,
					skip: i * postsPerPage,
					numPages,
					currentPage: i + 1,
				},
			});
		});

		// result.data.allMarkdownRemark.edges.map(({ node }) => {
		// 	if (!node.fields) {
		// 		return false;
		// 	}

		// 	const templateName = String(node.frontmatter.templateKey);
		// 	const { langKey } = node.fields;

		// 	return actions.createPage({
		// 		path: node.frontmatter.path,
		// 		context: {
		// 			slug: node.fields.slug,
		// 			pageType: node.frontmatter.templateKey,
		// 			langKey,
		// 		},
		// 		component: path.resolve(`./src/templates/${templateName}.jsx`),
		// 	});
		// });
	});
};

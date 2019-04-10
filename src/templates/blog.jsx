import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

export const BlogIndex = (props) => {
	const { data, location, pageContext } = props;
	const { site, markdownRemark, allMarkdownRemark } = data;
	const { title, description } = site.siteMetadata;
	const posts = allMarkdownRemark.edges;
	const { langKey } = pageContext;
	const pageTitle = 'Blog' || markdownRemark.frontmatter.title;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog' }}
				meta={[{ name: 'description', content: description }]}
				title={`${pageTitle} | ${title}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<section className="blog-list">
						{posts
							.filter((post) => {
								const { templateKey, status } = post.node.frontmatter;
								return templateKey === 'blog-post' && status !== 'draft';
							})
							.map(({ node }, index) => {
								const postKey = `blog-post-${index}`;
								const postTitle = get(node, 'frontmatter.title') || node.fields.slug;
								const excerpt = get(node, 'frontmatter.excerpt') || '';

								return (
									<div key={postKey}>
										<h2
											style={{
												marginBottom: rhythm(1 / 4),
											}}
										>
											<Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
												{postTitle}
											</Link>
										</h2>
										<small>{node.frontmatter.date}</small>
										<p dangerouslySetInnerHTML={{ __html: excerpt }} />
									</div>
								);
							})}
					</section>
				</div>
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
BlogIndex.defaultProps = {
	location: {},
};

BlogIndex.propTypes = {
	location: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
	query blogData($skip: Int!, $limit: Int!, $langKey: String!, $path: String!,) {
		site {
			siteMetadata {
				title
				description
			}
		}
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			frontmatter {
				title
			}
		}
        allMarkdownRemark(
				filter: { fields: { langKey: { eq: $langKey } } }
				sort: { fields: [frontmatter___date], order: DESC }
				limit: $limit
      			skip: $skip
			) {
			edges {
				node {
					excerpt
					fields {
						slug
						langKey
					}
					frontmatter {
						date(formatString: "DD MMMM, YYYY", locale: $langKey)
						title
						templateKey
						status
						path
						excerpt
					}
				}
			}
		}
	}
`;

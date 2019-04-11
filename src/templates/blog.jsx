import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import BlogPagination from '../components/BlogPagination';
import { rhythm } from '../utils/typography';

export const BlogIndex = (props) => {
	const { data, location, pageContext } = props;
	const { site, allMarkdownRemark } = data;
	const { title, description } = site.siteMetadata;
	const posts = allMarkdownRemark.edges;
	const {
		langKey,
		pageTitle,
		currentPage,
		numPages,
	} = pageContext;
	const langPrefix = langKey === 'en' ? 'en' : '';

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
						{posts.map(({ node }) => {
							const customTitle = node.frontmatter.title || node.fields.slug;
							return (
								<div key={node.fields.slug}>
									<h3
										style={{
											marginBottom: rhythm(1 / 4),
										}}
									>
										<Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
											{customTitle}
										</Link>
									</h3>
									<small>{node.frontmatter.date}</small>
									<p dangerouslySetInnerHTML={{ __html: node.frontmatter.excerpt }} />
								</div>
							);
						})}
					</section>

					<BlogPagination
						currentPage={currentPage}
						numPages={numPages}
						langPrefix={langPrefix}
					/>
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
	query blogData($skip: Int!, $limit: Int!, $langKey: String!) {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(
				filter: { 
					frontmatter: { templateKey: { eq: "blog-post" } },
					fields: { langKey: { eq: $langKey } },
				}
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
						date(formatString: "DD MMMM, YYYY")
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

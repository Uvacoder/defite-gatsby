import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { rhythm, scale } from '../utils/typography';
import styles from './blog-post.module.css';

export const BlogPostTemplate = (props) => {
	const { data, location } = props;
	const { site, markdownRemark: post } = data;

	const { title: siteTitle } = site.siteMetadata;
	const siteDescription = post.excerpt;

	const { langKey } = post.fields;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'blog-post' }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${post.frontmatter.title} | ${siteTitle}`}
			/>

			<div className={styles.post}>
				<header className={styles.header}>
					<h1 className={styles.h1}>{post.frontmatter.title}</h1>
					<p
						style={{
							...scale(-1 / 5),
							display: 'block',
							marginBottom: rhythm(1),
							marginTop: rhythm(-1),
						}}
					>
						{post.frontmatter.date}
					</p>
				</header>

				<div className={styles.article} dangerouslySetInnerHTML={{ __html: post.html }} />
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
BlogPostTemplate.defaultProps = {
	data: {},
	location: {},
};

BlogPostTemplate.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
	query BlogPostBySlug($langKey: String!, $path: String!) {
		site {
			siteMetadata {
				title
				author
			}
		}
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			id
			excerpt
			html
			fields {
				langKey
			}
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY", locale: $langKey)
			}
		}
	}
`;

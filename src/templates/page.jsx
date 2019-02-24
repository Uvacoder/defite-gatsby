import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { rhythm, scale } from '../utils/typography';

export const PageTemplate = (props) => {
	const { data, pageContext, location } = props;
	const { markdownRemark: post, site } = data;
	const { pageType } = pageContext;
	const { title: siteTitle } = site.siteMetadata;
	const siteDescription = post.excerpt;
	const { langKey } = post.fields;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: `${pageType}` }}
				meta={[{ name: 'description', content: siteDescription }]}
				title={`${post.frontmatter.title} | ${siteTitle}`}
			/>
			<div className="grid">
				<div className="grid-inner">
					<h1>{post.frontmatter.title}</h1>
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
					<div dangerouslySetInnerHTML={{ __html: post.html }} />
					<hr
						style={{
							marginBottom: rhythm(1),
						}}
					/>
				</div>
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
PageTemplate.defaultProps = {
	data: {},
	location: {},
	pageContext: {},
};

PageTemplate.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
	pageContext: PropTypes.object,
};

export default PageTemplate;

export const pageQuery = graphql`
	query PageBySlug($path: String!) {
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
			frontmatter {
				title
				date(formatString: "MMMM DD, YYYY")
			}
			fields {
				langKey
			}
		}
	}
`;

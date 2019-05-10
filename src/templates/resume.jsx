import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

import styles from './resume.module.css';


export const ResumeTemplate = (props) => {
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
					<div
						className={styles.resume__body}
						dangerouslySetInnerHTML={{ __html: post.html }}
					/>
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
ResumeTemplate.defaultProps = {
	data: {},
	location: {},
	pageContext: {},
};

ResumeTemplate.propTypes = {
	data: PropTypes.object,
	location: PropTypes.object,
	pageContext: PropTypes.object,
};

export default ResumeTemplate;

export const pageQuery = graphql`
	query ResumeData($path: String!) {
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
			}
			fields {
				langKey
			}
		}
	}
`;

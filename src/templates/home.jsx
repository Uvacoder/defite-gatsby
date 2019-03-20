import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import GithubRepoList from '../components/GithubRepoList';

import styles from './home.module.css';

export const IndexPage = (props) => {
	const { data, data: { markdownRemark }, location } = props;
	const { title, description } = data.site.siteMetadata;
	const { langKey } = markdownRemark.fields;
	const { edges: repos } = data.github.viewer.pinnedRepositories;

	/* eslint-disable react/no-danger */
	return (
		<Layout location={location} lang={langKey}>
			<Helmet
				htmlAttributes={{ lang: langKey, class: 'home' }}
				meta={[{ name: 'description', content: description }]}
				title={title}
			/>
			<div className="grid-inner">
				<section className={styles.intro}>
					<div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
				</section>
				<section className="grid">
					<GithubRepoList repositories={repos} lang={langKey} />
				</section>
			</div>
		</Layout>
	);
};

/* eslint-disable react/forbid-prop-types */
IndexPage.defaultProps = {
	location: {},
};

IndexPage.propTypes = {
	location: PropTypes.object,
	data: PropTypes.shape({
		markdownRemark: PropTypes.object,
	}).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexPageData($path: String!) {
		site {
			siteMetadata {
				title
				description
			}
		}
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			fields {
				langKey
			}
			frontmatter {
				title
				path
			}
		}
		github {
			viewer {
				name
				pinnedRepositories(first: 6) {
					edges {
						node {
							name
							url
							descriptionHTML
						}
					}
				}
			}
		}
	}
`;

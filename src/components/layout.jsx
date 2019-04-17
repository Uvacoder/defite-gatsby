import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header/Header';

import styles from './layout.module.css';

export const Template = (props) => {
	const { children, location } = props;
	const pathname = location.pathname.replace('/en/', '/');

	return (
		<div className={styles.wrapper}>
			<StaticQuery
				query={graphql`
					query HeadingQuery {
						site {
							siteMetadata {
								title
							}
						}
					}
				`}
				render={(data) => {
					const { title } = data.site.siteMetadata;
					const langKey = props.lang;

					return <Header title={title} lang={{ langKey }} slug={pathname} />;
				}}
			/>
			{children}
		</div>
	);
};

Template.defaultProps = {
	lang: 'ru',
};

Template.propTypes = {
	children: PropTypes.node.isRequired,
	lang: PropTypes.string,
};

export default Template;

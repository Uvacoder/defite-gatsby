import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Header from './Header/Header';
import Menu from './Menu/Menu';

import translate from './site.lang';
import LangContext from '../context/langContext';

import styles from './layout.module.css';

const Template = (props) => {
	const { children, lang, location } = props;
	const langPref = lang === 'en' ? '/en' : '';

	const state = {
		lang,
		langPref,
		location,
	};

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
				render={() => {
					const currLang = translate[lang];
					const menuItems = currLang.menu || [];

					return (
						<LangContext.Provider value={state}>
							<Header title={currLang.title}>
								<Menu items={menuItems} />
							</Header>
						</LangContext.Provider>
					);
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

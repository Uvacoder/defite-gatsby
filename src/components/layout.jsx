import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import translate from './site.lang';
import LangContext from '../context/langContext';

import Header from './Header/Header';
import Menu from './Menu/Menu';

import './layout.css';

const Template = (props) => {
	const { children, lang, location } = props;
	const langPref = lang === 'en' ? '/en' : '';

	const state = {
		lang,
		langPref,
		location,
	};

	const currLang = translate[lang];
	const menuItems = currLang.menu || [];
	const menuOpenCls = 'menu-visible';

	const handleMenuToggle = (event) => {
		const isWrapper = event.target.getAttribute('class') === 'wrapper';
		const isMenuVisible = document.body.classList.contains(menuOpenCls);

		if (isWrapper && isMenuVisible) {
			document.body.classList.remove(menuOpenCls);
		}
	};

	return (
		<LangContext.Provider value={state}>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div className="wrapper" onClick={handleMenuToggle} onKeyDown={handleMenuToggle}>
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
					render={() => (
						<Header title={currLang.title}>
							<Menu items={menuItems} />
						</Header>
					)}
				/>
				{children}
			</div>
		</LangContext.Provider>
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

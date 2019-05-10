import React from 'react';
import { Link } from 'gatsby';
import LangContext from '../../context/langContext';
import MenuSwitcher from '../MenuSwitcher/MenuSwitcher';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';

import styles from './header.module.css';

class Header extends React.Component {
	static contextType = LangContext;

	render() {
		const { title, children } = this.props;
		const { langPref } = this.context;

		return (
			<header className={styles.header}>
				<MenuSwitcher />
				<h3 className={styles.logo}>
					<Link to={`${langPref}/`}>{title}</Link>
				</h3>
				<nav className={styles.nav}>
					{ children }
				</nav>
				<LanguageSwitcher />
			</header>
		);
	}
}

export default Header;

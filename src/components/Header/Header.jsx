import React from 'react';
import { Link } from 'gatsby';
import styles from './header.module.css';
import LangContext from '../../context/langContext';

class Header extends React.Component {
	static contextType = LangContext;

	render() {
		const { title, children } = this.props;
		const { langPref } = this.context;

		return (
			<header className={styles.header}>
				<h3 className={styles.logo}>
					<Link to={`${langPref}/`}>{title}</Link>
				</h3>
				{ children }
			</header>
		);
	}
}

export default Header;

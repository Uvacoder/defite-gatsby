import React from 'react';
import { Link } from 'gatsby';
import LangContext from '../../context/langContext';
import styles from '../Header/header.module.css';

class MenuItem extends React.Component {
	static contextType = LangContext

	render() {
		const { link, text } = this.props;
		const { langPref } = this.context;

		return (
			<li className={styles.menuItem}>
				<Link to={`${langPref}/${link}`}>{text}</Link>
			</li>
		);
	}
}

export default MenuItem;

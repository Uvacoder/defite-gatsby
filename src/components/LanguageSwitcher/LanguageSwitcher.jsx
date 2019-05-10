import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import styles from './style.module.css';
import LangContext from '../../context/langContext';

class LanguageSwitcher extends React.Component {
	static contextType = LangContext;

	render() {
		const { lang, location } = this.context;
		const slug = location.pathname.replace('/en/', '/');
		const isRus = lang === 'ru';
		const isEn = lang === 'en';

		return (
			<span className={classNames(styles.switcher)}>
				<Link className={isEn ? styles.active : ''} to={`en${slug}`}>
					en
				</Link>
				<Link className={isRus ? styles.active : ''} to={slug}>
					рус
				</Link>
			</span>
		);
	}
}

export default LanguageSwitcher;

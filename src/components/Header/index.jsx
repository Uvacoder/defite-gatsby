import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'gatsby';
import styles from './header.module.css';
import translate from './header.lang';

export const Header = (props) => {
	const { lang, slug } = props;
	const langPref = lang.langKey === 'en' ? '/en' : '';
	const isRus = lang.langKey === 'ru';
	const isEn = lang.langKey === 'en';
	const currLang = translate[lang.langKey];

	return (
		<header className={styles.header}>
			<h3 className={styles.logo}>
				<Link to={`${langPref}/`}>{currLang.title}</Link>
			</h3>
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					<li className={styles.menuItem}>
						<Link to={`${langPref}/`}>
							{currLang.home}
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to={`${langPref}/blog`}>
							{currLang.blog}
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to={`${langPref}/about`}>
							{currLang.about}
						</Link>
					</li>
					<li className={classNames(styles.menuItem, styles.languageSwitcher)}>
						<Link className={isEn ? styles.active : ''} to={`en${slug}`}>en</Link>
						<Link className={isRus ? styles.active : ''} to={slug}>рус</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

Header.defaultProps = {
	lang: 'ru',
};

Header.propTypes = {
	lang: PropTypes.shape({
		langKey: PropTypes.string,
	}),
};

export default Header;

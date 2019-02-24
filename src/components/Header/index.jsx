import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './header.module.css';
import translate from './header.lang';

export const Header = (props) => {
    const { /*title,*/ lang } = props;
    const langPref = (lang.langKey === 'en' ? '/en' : '');
    const currLang = translate[lang.langKey];
    
	return (
		<header className={styles.header}>
			<h3 className={styles.logo}>
				<Link to={`${langPref}/`}>{currLang.title}</Link>
			</h3>
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					<Link className={styles.menuItem} to={`${langPref}/`}>
						{currLang.home}
					</Link>
					<Link className={styles.menuItem} to={`${langPref}/blog`}>
						{currLang.blog}
					</Link>
					<Link className={styles.menuItem} to={`${langPref}/about`}>
						{currLang.about}
					</Link>
				</ul>
			</nav>
		</header>
	);
};

Header.defaultProps = {
	title: 'Nikita Makhov',
	lang: 'ru'
};

Header.propTypes = {
	title: PropTypes.string,
	lang: PropTypes.object
};

export default Header;

import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import MenuItem from './MenuItem';
import styles from '../Header/header.module.css';
import LangContext from '../../context/langContext';

class Menu extends React.Component {
	static contextType = LangContext

	render() {
		const { items } = this.props;
		const { lang, location } = this.context;
		const slug = location.pathname.replace('/en/', '/');
		const isRus = lang === 'ru';
		const isEn = lang === 'en';

		return (
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					{
						items.map(item => (
							<MenuItem link={item.link} text={item.text} lang={lang} key={`menu-item-${item.id}`} />
						))
					}

					<li className={classNames(styles.menuItem, styles.languageSwitcher)}>
						<Link
							className={isEn ? styles.active : ''}
							to={`en${slug}`}
						>
							en
						</Link>
						<Link
							className={isRus ? styles.active : ''}
							to={slug}
						>
							рус
						</Link>
					</li>
				</ul>
			</nav>
		);
	}
}

export default Menu;

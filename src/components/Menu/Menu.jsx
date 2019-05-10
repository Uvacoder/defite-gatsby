import React from 'react';
import MenuItem from './MenuItem';
import styles from './style.module.css';
import LangContext from '../../context/langContext';

class Menu extends React.Component {
	static contextType = LangContext

	render() {
		const { items } = this.props;
		const { lang } = this.context;

		return (
			<ul className={styles.menu}>
				{
					items.map(item => (
						<MenuItem link={item.link} text={item.text} lang={lang} key={`menu-item-${item.id}`} />
					))
				}
			</ul>
		);
	}
}

export default Menu;

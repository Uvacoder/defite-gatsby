import React from 'react';
import styles from './MenuSwitcher.module.css';
import Burger from './burger.svg';

const MenuSwitcher = () => {
	const menuOpenCls = 'menu-visible';

	const handleMenuToggle = (event) => {
		event.preventDefault();
		const isMenuVisible = document.body.classList.contains(menuOpenCls);

		if (isMenuVisible) {
			document.body.classList.remove('menu-visible');
		} else {
			document.body.classList.add('menu-visible');
		}
	};

	return (
		<button type="button" className={styles.switcher} onClick={handleMenuToggle} onKeyDown={handleMenuToggle}>
			<img src={Burger} alt="" />
		</button>
	);
};

export default MenuSwitcher;

import React from 'react';
import styles from './MenuSwitcher.module.css';
import Burger from './burger.inline.svg';

const MenuSwitcher = () => {
	const menuOpenCls = 'menu-visible';

	const handleMenuToggle = (event) => {
		event.preventDefault();
		const isMenuVisible = document.body.classList.contains(menuOpenCls);

		if (isMenuVisible) {
			document.body.classList.remove(menuOpenCls);
		} else {
			document.body.classList.add(menuOpenCls);
		}
	};

	return (
		<button type="button" className={styles.switcher} onClick={handleMenuToggle} onKeyDown={handleMenuToggle}>
			<Burger />
		</button>
	);
};

export default MenuSwitcher;

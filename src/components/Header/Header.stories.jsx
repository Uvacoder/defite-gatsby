import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Header from './Header';
import Menu from '../Menu/Menu';
import translate from '../site.lang';
import LangContext from '../../context/langContext';

const stories = storiesOf('Header', module);
stories
	.addDecorator(withKnobs)
	.addParameters({ viewport: { defaultViewport: 'iphone6' } });

stories.add('Header',
	() => {
		const groupId = 'Header props';

		// Lang props
		const headerLangOptions = {
			ru: 'ru',
			en: 'en',
		};
		const defaultLangValue = 'ru';

		const langValue = select('Languages', headerLangOptions, defaultLangValue, groupId);

		// State for LangContext.Provider
		const state = {
			lang: langValue,
			langPref: langValue === 'en' ? '/en' : '',
			location: {
				pathname: '/',
			},
		};

		const title = text('Title', langValue === 'en' ? 'Nikita Makhov' : 'Никита Махов', groupId);

		// Items for menu in header
		const menuItems = translate[langValue].menu;

		const handleMenuToggle = (event) => {
			event.preventDefault();
			const isWrapper = event.target.getAttribute('class') === 'wrapper';

			if (isWrapper) {
				document.body.classList.remove('menu-visible');
			}
		};

		return (
			<LangContext.Provider value={state}>
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
				<div className="wrapper" onClick={handleMenuToggle} onKeyDown={handleMenuToggle}>
					<Header title={title} slug="/">
						<Menu items={menuItems} />
					</Header>
				</div>
			</LangContext.Provider>
		);
	},
	{ viewport: { defaultViewport: 'iphonex' } });

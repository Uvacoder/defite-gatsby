import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import Header from './Header';
import Menu from '../Menu/Menu';
import translate from '../site.lang';
import LangContext from '../../context/langContext';

const stories = storiesOf('Header', module);
stories.addDecorator(withKnobs);

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
		};

		const title = langValue === 'en' ? text('Title', 'Nikita Makhov', groupId) : text('Title', 'Никита Махов', groupId);

		// Items for menu in header
		const menuItems = translate[langValue].menu;

		return (
			<LangContext.Provider value={state}>
				<Header title={title} slug="/">
					<Menu items={menuItems} />
				</Header>
			</LangContext.Provider>
		);
	});

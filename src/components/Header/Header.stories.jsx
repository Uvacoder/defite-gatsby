import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from './Header';

const stories = storiesOf('Header', module);

stories.add('Header, ru',
	() => (
		<Header title="Никита Махов" lang={{ langKey: 'ru' }} slug="/" />
	),
	{
		info: {
			text: 'Header',
		},
	});

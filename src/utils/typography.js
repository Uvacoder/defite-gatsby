import Typography from 'typography';
import Parnassus from 'typography-theme-parnassus';

Parnassus.overrideThemeStyles = () => ({
	'a.gatsby-resp-image-link': {
		boxShadow: 'none',
	},
});

Parnassus.headerFontFamily = ['Fira Sans', 'sans-serif'];
Parnassus.baseFontSize = '19px';
Parnassus.headerWeight = '700';

// delete Parnassus.googleFonts;

const typography = new Typography(Parnassus);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
	typography.injectStyles();
}

export default typography;
export const { rhythm, scale } = typography;

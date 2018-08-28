import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'
import Parnassus from 'typography-theme-parnassus'

Parnassus.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
  },
})

// delete Parnassus.googleFonts

const typography = new Typography(Parnassus)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale

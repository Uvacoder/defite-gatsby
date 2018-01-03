import React from "react"
import Link from "gatsby-link"
import styles from "./layout.module.css"

const MenuItem = props =>
  <li className={styles.menuItem}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>

export default ({ children, data }) => (
  <div style={{ margin: `0 auto`, maxWidth: 650, padding: `1.25rem 1rem` }}>
    <header className={ styles.header }>
      <h3 className={ styles.logo }>
        <Link to="/">{data.site.siteMetadata.title}</Link>
      </h3>
      <ul className={ styles.menu }>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/blog/">Blog</MenuItem>
        <MenuItem to="/about/">About</MenuItem>
      </ul>
    </header>
    {children()}
  </div>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

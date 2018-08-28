import React from 'react'
import { Link,graphql } from 'gatsby'
import styles from './layout.module.css'

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <h3 className={styles.logo}>
          <Link to="/">{this.props.title}</Link>
        </h3>
        <ul className={styles.menu}>
          <Link className={ styles.menuItem } to="/">Home</Link>
          <Link className={ styles.menuItem } to="/blog/">Blog</Link>
          <Link className={ styles.menuItem } to="/about/">About</Link>
        </ul>
      </header>
    )
  }
}

export default Header

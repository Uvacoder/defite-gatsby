import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styles from './layout.module.css';

export const Header = (props) => {
  const { title } = props;

  return (
    <header className={styles.header}>
      <h3 className={styles.logo}>
        <Link to="/">{title}</Link>
      </h3>
      <ul className={styles.menu}>
        <Link className={styles.menuItem} to="/">Home</Link>
        <Link className={styles.menuItem} to="/blog/">Blog</Link>
        <Link className={styles.menuItem} to="/about/">About</Link>
      </ul>
    </header>
  );
};

Header.defaultProps = {
  title: 'Nikita Makhov',
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;

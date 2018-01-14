import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styles from './layout.module.css';

/**
* Render menu item
* @param {Object} props - Props for menu item
*/
const MenuItem = props => (
  <li className={styles.menuItem}>
    <Link to={props.to}>
      {props.children}
    </Link>
  </li>
);

/**
* Render Header
* @param {Object} data - Data for header
*/
const Header = (data) => {
  const { logoTitle, pageTitle } = data.site.siteMetadata;
  return (
    <header className={styles.header}>
      <h3 className={styles.logo}>
        <Link to="/">{logoTitle}</Link>
      </h3>
      <ul className={styles.menu}>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/blog/">Blog</MenuItem>
        <MenuItem to="/about/">About</MenuItem>
      </ul>
    </header>
  );
};

/**
* Render Wrapper
* @param {function} - Returns children to render
* @param {Object} - Data passed to header
*/
const Wrapper = ({ children, data }) => {
  const { logoTitle, pageTitle } = data.site.siteMetadata;
  return (
    <div className={styles.wrapper}>
      <Helmet title={`${logoTitle} – ${pageTitle}`} />
      <Header {...data} />
      <div>{children()}</div>
    </div>
  );
};

Wrapper.propTypes = {
  children: PropTypes.func,
};

export default Wrapper;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        logoTitle,
        pageTitle
      }
    }
  }
`;

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import Header from '../components/Header/';

import styles from './layout.module.css';

export const Template = (props) => {
  const { children } = props;

  return (
    <div
      className={styles.wrapper}
    >
      <StaticQuery
        query={graphql`
          query HeadingQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <Header title={data.site.siteMetadata.title} />
        )}
      />
        {children}
    </div>
  );
};

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;

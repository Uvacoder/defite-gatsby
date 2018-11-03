import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';
import { Header } from './Header';

import styles from './layout.module.css';

export const Template = (props) => {
  const { children } = props;
  return (
    <div
      className={styles.wrapper}
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
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

import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';
import Layout from '../components/layout';

import styles from './home.module.css';

export const IndexPage = (props) => {
  const { data: { markdownRemark }, location } = props;
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const siteDescription = get(props, 'data.site.siteMetadata.description');

  /* eslint-disable react/no-danger */
  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />
      <section className={styles.intro}>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </section>
    </Layout>
  );
};

/* eslint-disable react/forbid-prop-types */
IndexPage.defaultProps = {
  location: {},
};

IndexPage.propTypes = {
  location: PropTypes.object,
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }).isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageData($path: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`;

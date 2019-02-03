import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Layout from '../components/layout';
import { rhythm, scale } from '../utils/typography';
import styles from './blog-post.module.css';

export const BlogPostTemplate = (props) => {
  const {
    data: { markdownRemark: post },
    location,
    pageContext: { next, previous },
  } = props;
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const siteDescription = post.excerpt;

  const headerImage = get(props, 'data.markdownRemark.frontmatter.headerImage.childImageSharp.fluid') || {};
  const { src: headerImageSrc, srcSet:  headerImageSrcSet } = headerImage;
  
  /* eslint-disable react/no-danger */
  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en', class: 'blog-post' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={`${post.frontmatter.title} | ${siteTitle}`}
      />
      
        <div className={styles.post}>

          <header className={styles.header}>
            <h1 className={styles.h1}>{post.frontmatter.title}</h1>
            <p
              style={{
                ...scale(-1 / 5),
                display: 'block',
                marginBottom: rhythm(1),
                marginTop: rhythm(-1),
              }}
            >
              {post.frontmatter.date}
            </p>
          </header>

          <div className={styles.article} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      
    </Layout>
  );
};

/* eslint-disable react/forbid-prop-types */
BlogPostTemplate.defaultProps = {
  data: {},
  location: {},
  pageContext: {},
};

BlogPostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  pageContext: PropTypes.object,
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;

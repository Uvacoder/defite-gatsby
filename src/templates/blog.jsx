import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import { rhythm } from '../utils/typography';

export const BlogIndex = (props) => {
  const siteTitle = get(props, 'data.site.siteMetadata.title');
  const siteDescription = get(props, 'data.site.siteMetadata.description');
  const posts = get(props, 'data.allMarkdownRemark.edges');
  const { location } = props;

  /* eslint-disable react/no-danger */
  return (
    <Layout location={location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />
      {posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node }) => {
        const title = get(node, 'frontmatter.title') || node.fields.slug;
        return (
          <div key={node.fields.slug}>
            <h2
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
                {title}
              </Link>
            </h2>
            <small>{node.frontmatter.date}</small>
            <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        );
      })}
    </Layout>
  );
};

/* eslint-disable react/forbid-prop-types */
BlogIndex.defaultProps = {
  location: {},
};

BlogIndex.propTypes = {
  location: PropTypes.object,
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title,
            templateKey
            path
          }
        }
      }
    }
  }
`;

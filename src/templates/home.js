import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'

import styles from './home.module.css'

class IndexPage extends React.Component {
  render() {
    const { data: { markdownRemark } } = this.props;
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
      <section className={ styles.intro }>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </section>
      </Layout>
    );
  }
}

export default IndexPage

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

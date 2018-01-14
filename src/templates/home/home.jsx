import React, { Component } from 'react';
import Script from 'react-load-script';
import styles from './home.module.css';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.handleScriptLoad = this.handleScriptLoad.bind(this)
  }

  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
    window.netlifyIdentity.init();
  }

  render() {
    const { data: { markdownRemark } } = this.props;
    return (
      <section className={styles.intro}>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad}
        />
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </section>
    );
  }
}

export const pageQuery = graphql`
  query IndexPageData($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`;

import React, { Component } from "react"
import Script from 'react-load-script'

export default class IndexPage extends Component {
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
      <div>
        <Script
          url="https://identity.netlify.com/v1/netlify-identity-widget.js"
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <h1>{ markdownRemark.frontmatter.title }</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </div>
    )
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

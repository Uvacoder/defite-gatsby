import React from 'react'
import styles from './blog-post.module.css'

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div className={ styles.post }>
      <h1>{post.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`;

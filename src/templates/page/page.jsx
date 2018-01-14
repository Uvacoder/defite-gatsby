import React from 'react';

export default ({ data }) => {
  const page = data.markdownRemark;
  return (
    <div>
      <h2>{page.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </div>
  );
};

export const pageQuery = graphql`
  query PageData($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        path
      }
    }
  }
`;

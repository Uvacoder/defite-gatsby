import React from "react"
import Link from "gatsby-link"

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      { posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node }) => (
        <div key={node.id}>
          <Link
            to={node.frontmatter.path}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
          <h2>
            {node.frontmatter.title}{" "}
            <span>— {node.frontmatter.date}</span>
          </h2>
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))}

    </div>
  )
}

export const query = graphql`
  query BlogPostsQuery {
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            templateKey
            title
            date(formatString: "DD MMMM, YYYY")
            path
          }
          excerpt
        }
      }
    }
  }
`;

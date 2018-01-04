import React from "react"
import Link from "gatsby-link"
import styles from "./blog.module.css"

export default ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div>
      { posts.filter(post => post.node.frontmatter.templateKey === 'blog-post').map(({ node }) => (
        <div key={node.id}>

          <h2 className={ styles.title }>
            <Link to={node.frontmatter.path}>{node.frontmatter.title}</Link>
          </h2>
          <span className={ styles.pubdate }>{node.frontmatter.date}</span>

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

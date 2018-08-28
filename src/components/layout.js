import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import Header from './Header'

import styles from './layout.module.css'

class Template extends React.Component {
  render() {
    const { children } = this.props
    
    return (
      <div className={ styles.wrapper }
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <StaticQuery
          query={graphql`
            query HeadingQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={data => (
            <Header title={ data.site.siteMetadata.title } />
          )}
        />
        {children}
      </div>
    )
  }
}

export default Template

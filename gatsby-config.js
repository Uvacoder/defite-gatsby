const postcssPresetEnv = require('postcss-preset-env');
const fs = require('fs');
const fetch = require('node-fetch');
const { buildClientSchema } = require('graphql');
const { createHttpLink } = require('apollo-link-http');

module.exports = {
  siteMetadata: {
    title: 'Nikita Makhov',
    author: 'Nikita Makhov',
    description: 'Frontend developer blog',
    siteUrl: 'https://defite.ru',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          "gatsby-remark-unwrap-images",
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2560,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Nikita Makhov',
        short_name: 'Defite.ru',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/assets/gatsby-icon.png',
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          postcssPresetEnv({
            stage: 3,
            features: {
              'nesting-rules': true,
            },
          }),
        ],
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `github`,
        typeName: `GitHub`,
        createLink: () =>
          createHttpLink({
            uri: `https://api.github.com/graphql`,
            headers: {
              Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
            },
            fetch,
          }),
        // createSchema: async () => {
        //   const json = JSON.parse(fs.readFileSync(`${__dirname}/github.json`))
        //   return buildClientSchema(json.data)
        // },
      },
    }
  ],
};

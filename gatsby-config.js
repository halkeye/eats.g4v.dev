module.exports = {
  siteMetadata: {
    title: 'Eats'
  },
  plugins: [
    'gatsby-plugin-offline',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-QSS6YQR515'
      }
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png'
      }
    },
    /*
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [`.mdx`],
        defaultLayouts: {
          recipes: require.resolve("./src/components/recipes-layout.js"),
          // default: require.resolve("./src/components/default-page-layout.js"),
        },
      },
    },
    */
    'gatsby-transformer-yaml',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/'
      },
      __key: 'images'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/'
      },
      __key: 'pages'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'recipes',
        path: './src/recipes/'
      },
      __key: 'recipes'
    }
  ]
};

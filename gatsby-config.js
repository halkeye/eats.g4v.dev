module.exports = {
  siteMetadata: {
    title: 'Eats',
    titleTemplate: 'Eats - %s',
    siteUrl: 'https://eats.g4v.dev/',
    description: 'Recipes collected by Gavin',
    image: './src/images/icon.png',
    twitterUsername: '@halkeye',
    author: 'Gavin Mogan',
    locale: {
      language: 'en',
      culture: 'CA'
    },
    organization: {
      url: 'https://www.gavinmogan.com',
      name: 'Gavin Mogan',
      company: 'Gavin Mogan',
      logo: ''
    }
  },
  plugins: [
    {
      resolve: '@pittica/gatsby-plugin-seo',
      options: {
        image: './src/images/placeholder_food.png',
        socials: {
          instagram: {
            username: 'whyamigavin'
          },
          github: {
            username: '@halkeye'
          },
          twitter: {
            username: '@halkeye',
            site: '@halkeye'
          },
          linkedin: {
            page: 'halkeye'
          }
        }
      }
    },
    'gatsby-plugin-react-svg',
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

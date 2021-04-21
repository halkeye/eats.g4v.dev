const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');

exports.onCreateNode = ({node, getNode, actions}) => {
  const {createNodeField} = actions;
  if (node.internal.type === 'RecipesYaml') {
    const slug = createFilePath({node, getNode, basePath: 'recipes'});
    createNodeField({
      node,
      name: 'slug',
      value: `/recipe${slug}`
    });
  }
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const result = await graphql(`
    query {
      allRecipesYaml {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allRecipesYaml.edges.forEach(({node}) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/recipe.js'),
      context: {
        slug: node.fields.slug
      }
    });
  });
};

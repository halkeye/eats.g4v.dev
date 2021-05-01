const path = require('path');
const {createFilePath} = require('gatsby-source-filesystem');
const slugify = require('slugify');

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
        allCuisines: group(field: cuisine) {
          fieldValue
        }
        allCourses: group(field: course) {
          fieldValue
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
  result.data.allRecipesYaml.allCourses.forEach(({fieldValue}) => {
    createPage({
      path: `/course/${slugify(fieldValue)}`,
      component: path.resolve('./src/templates/course.js'),
      context: {
        slug: fieldValue
      }
    });
  });
  result.data.allRecipesYaml.allCuisines.forEach(({fieldValue}) => {
    createPage({
      path: `/cuisine/${slugify(fieldValue)}`,
      component: path.resolve('./src/templates/cuisine.js'),
      context: {
        slug: fieldValue
      }
    });
  });
};

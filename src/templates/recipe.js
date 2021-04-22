import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import Layout from '../components/layout';

export default function Recipe({data: {recipe}}) {
  return (
    <Layout>
      <h1>{recipe.title}</h1>
      <div>Hello blog post</div>
      {recipe.image?.childImageSharp && <GatsbyImage image={recipe.image.childImageSharp.gatsbyImageData} />}
    </Layout>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    recipe: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.object
    }).isRequired
  }).isRequired
};

export const query = graphql`
  query($slug: String!) {
    recipe: recipesYaml(fields: { slug: { eq: $slug } }) {
      id
      title
      ingredients {
        name
        items {
          item
          amt
        }
      }
      servings
      source
      cook_time
      course
      cuisine
      directions
      info
      tags
      prep_time
      image {
        childImageSharp {
          gatsbyImageData(height: 400, layout: CONSTRAINED)
        }
      }
    }
  }
`;

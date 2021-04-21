import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
// import Layout from '../components/layout';

const Layout = ({children}) => <>{children}</>;
Layout.propTypes = {
  children: PropTypes.element.isRequired
};

export default function Recipe({data}) {
  const recipe = data.recipesYaml;
  return (
    <Layout>
      <h1>{recipe.title}</h1>
      <div>Hello blog post</div>
      <GatsbyImage image={recipe.image.childImageSharp.gatsbyImageData} />
    </Layout>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    recipesYaml: PropTypes.shape({
      id: PropTypes.string.required,
      title: PropTypes.string.required
    }).required
  }).required
};

export const query = graphql`
  query($slug: String!) {
    recipesYaml(fields: { slug: { eq: $slug } }) {
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

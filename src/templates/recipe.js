import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import Layout from '../components/layout';

export default function Recipe({data: {recipe}}) {
  return (
    <Layout>
      <div className="card">
        <GatsbyImage
          image={getImage(recipe.image)}
          objectFit="contain"
          className="card-img-top"
          alt={recipe.title}
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">
            {recipe.ingredients.map((i, idx) => {
              return (
                <div key={idx}>
                  <ul className="list-group">
                    {i.name && (
                      <li className="list-group-item">
                        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                          <span>{i.name}</span>
                        </h6>
                      </li>
                    )}
                    {i.items.map(c => {
                      return (
                        <li key={c.item} className="list-group-item">
                          {c.amt}
                          {' '}
                          {c.item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    </Layout>
  );
}

Recipe.propTypes = {
  data: PropTypes.shape({
    recipe: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.object,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          items: PropTypes.arrayOf(
            PropTypes.shape({
              item: PropTypes.string.isRequired,
              amt: PropTypes.string
            })
          ).isRequired
        })
      ).isRequired
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
          gatsbyImageData(height: 400, layout: CONSTRAINED, transformOptions: {fit: CONTAIN})
        }
      }
    }
  }
`;

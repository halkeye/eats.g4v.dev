import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'gatsby';
import {GatsbyImage, getImage, getSrc} from 'gatsby-plugin-image';
import {Seo} from '@pittica/gatsby-plugin-seo';
import Layout from '../components/layout';

export default function Recipe({data: {recipe}}) {
  return (
    <Layout>
      <Seo
        title={recipe.title}
        description={recipe.info || recipe.title}
        path={recipe.fields.slug}
        image={getSrc(recipe.image)}
      />
      <div className="card">
        <GatsbyImage
          image={getImage(recipe.image)}
          objectFit="contain"
          className="card-img-top"
          alt={recipe.title}
        />
        <div className="card-body">
          <h4 className="card-title">{recipe.title}</h4>
          <p className="card-text">
            <h5>Ingredients</h5>
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
            <h5>Directions</h5>
            <ol>
              {recipe.directions.map((d, idx) => (<li key={idx}>{d}</li>))}
            </ol>
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
      info: PropTypes.string,
      directions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      image: PropTypes.object,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired
      }),
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
      fields {
        slug
      }
      image {
        childImageSharp {
          gatsbyImageData(height: 400, layout: CONSTRAINED, transformOptions: {fit: CONTAIN})
        }
      }
      ingredients {
        name
        items {
          item
          amt
        }
      }
      directions

      servings
      source
      cook_time
      course
      cuisine
      info
      tags
      prep_time
    }
  }
`;

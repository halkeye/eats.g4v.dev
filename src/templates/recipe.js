import React from 'react';
import PropTypes from 'prop-types';
import {graphql, Link} from 'gatsby';
import formatDistance from 'date-fns/formatDistance';
import {GatsbyImage, getImage, getSrc} from 'gatsby-plugin-image';
import slugify from 'slugify';
import {Seo} from '@pittica/gatsby-plugin-seo';
import Layout from '../components/layout';

const isURL = (url) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const Ingredients = ({ingredients}) => {
  return ingredients.map((i, idx) => (
    <ul key={idx} className="list-unstyled">
      {i.name && (
        <li>
          <strong>
            <span>{i.name}</span>
          </strong>
        </li>
      )}
      {i.items.map(c => {
        return (
          <li key={c.item}>
            {c.amt}
            {' '}
            {c.item}
          </li>
        );
      })}
    </ul>
  ));
};

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
          <h5 className="card-title">{recipe.title}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{recipe.info}</h6>
          <div className="card-text">
            <div className="row">
              <div className="col-md-12">
                <div className="float-right panel panel-default">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Servings</th>
                        <th>Prep time</th>
                        <th>Cooking time</th>
                      </tr>
                    </thead>
                    <tr>
                      <td>{recipe.servings}</td>
                      <td>{recipe.prep_time ? formatDistance(0, recipe.prep_time * 1000 * 60) : 'Unknown'}</td>
                      <td>{recipe.cook_time ? formatDistance(0, recipe.cook_time * 1000 * 60) : 'Unknown'}</td>
                    </tr>
                    <thead className="thead-dark">
                      <tr>
                        <th>Course</th>
                        <th>Cuisine</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tr>
                      <td><Link to={`/course/${slugify(recipe.course)}`}>{recipe.course}</Link></td>
                      <td><Link to={`/cuisine/${slugify(recipe.cuisine)}`}>{recipe.cuisine}</Link></td>
                      <td>{isURL(recipe.source) ? (<a href={recipe.source} rel="nofollow">{new URL(recipe.source).host}</a>) : recipe.source}</td>
                    </tr>
                  </table>
                </div>
                <h6 className="mb-2 text-muted">Ingredients</h6>
                <Ingredients ingredients={recipe.ingredients} />
                <h6 className="mb-2 text-muted">Directions</h6>
                <ol>
                  {recipe.directions.map((d, idx) => (<li key={idx}>{d}</li>))}
                </ol>
              </div>
            </div>
          </div>
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
      servings: PropTypes.number,
      cook_time: PropTypes.number,
      prep_time: PropTypes.number,
      source: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      cuisine: PropTypes.string.isRequired,
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
      course
      cuisine
      info
      prep_time
      cook_time
    }
  }
`;

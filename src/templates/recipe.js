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

const cardStyle = {
  padding: '30px',
  position: 'relative'
};

const cardInfoStyle = {
  zIndex: '10',
  background: 'white',
  padding: '20px 15px'
};

const cardHeadStyle = {
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const titleBoxStyle = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#ccc',
  background: 'rgba(0,0,0,0.45)',
  border: '4px solid',
  fontWeight: 'bold',
  padding: '5px 10px'
};

const cardBackgroundWrapper = {
  height: '100%',
  // clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 60%)',
  position: 'relative',
  overflow: 'hidden'
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
      <div className="container mt-1">
        <div className="row">
          <div className="col-12">
            <article style={cardStyle}>
              <div style={cardBackgroundWrapper}>
                <GatsbyImage
                  image={getImage(recipe.image)}
                  objectFit="contain"
                  alt={recipe.title}
                  style={{position: 'absolute'}}
                />
                <div style={cardHeadStyle}>
                  <span style={titleBoxStyle}>
                    <div>{recipe.title}</div>
                    <div className="mb-2 text-muted">{recipe.info}</div>
                  </span>
                </div>
              </div>
              <div style={cardInfoStyle}>
                <div className="float-right panel panel-default">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Servings</th>
                        <th>Prep time</th>
                        <th>Cooking time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{recipe.servings}</td>
                        <td>{recipe.prep_time ? formatDistance(0, recipe.prep_time * 1000 * 60) : 'Unknown'}</td>
                        <td>{recipe.cook_time ? formatDistance(0, recipe.cook_time * 1000 * 60) : 'Unknown'}</td>
                      </tr>
                    </tbody>
                    <thead className="thead-dark">
                      <tr>
                        <th>Course</th>
                        <th>Cuisine</th>
                        <th>Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><Link to={`/course/${slugify(recipe.course)}`}>{recipe.course}</Link></td>
                        <td><Link to={`/cuisine/${slugify(recipe.cuisine)}`}>{recipe.cuisine}</Link></td>
                        <td>{isURL(recipe.source) ? (<a href={recipe.source} rel="nofollow">{new URL(recipe.source).host}</a>) : recipe.source}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h6 className="mb-2 text-muted">Ingredients</h6>
                <Ingredients ingredients={recipe.ingredients} />
                <h6 className="mb-2 text-muted">Directions</h6>
                <ol>
                  {recipe.directions.map((d, idx) => (<li key={idx}>{d}</li>))}
                </ol>
              </div>
            </article>
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
          gatsbyImageData(width: 1200, layout: CONSTRAINED, transformOptions: {fit: COVER, cropFocus: ATTENTION})
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

/* eslint-disable react/prop-types */
import * as React from 'react';
import {graphql, Link} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import 'bootstrap/dist/css/bootstrap.min.css';

// styles
const pageStyles = {
  color: '#232129',
  padding: 96,
  fontFamily: '-apple-system, Roboto, sans-serif, serif'
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320
};

// markup
const IndexPage = ({
  data: {
    allRecipesYaml: {recipies}
  }
}) => {
  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <h1 style={headingStyles}>
        Recipes
      </h1>
      <div className="row">
        {recipies.map(({recipe}) => {
          return (
            <div key={recipe.id} className="col-xs-12 col-sm-6 col-md-3">
              <div className="card w-100 h-100">
                {recipe.image ? <GatsbyImage className="card-img-top" image={recipe.image.childImageSharp.gatsbyImageData} alt={recipe.title} /> : <div>FIXME</div>}
                <div className="card-body">
                  <h5 className="card-title"><Link to={recipe.fields.slug}>{recipe.title}</Link></h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* <pre>{JSON.stringify(recipies, null, 2)}</pre> */}
    </main>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allRecipesYaml(sort: { order: DESC, fields: [title] }) {
      recipies: edges {
        recipe: node {
          id
          title
          image {
            childImageSharp {
              gatsbyImageData(height: 200, layout: CONSTRAINED)
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `;

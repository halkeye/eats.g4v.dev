/* eslint-disable react/prop-types */
import * as React from 'react';
import {graphql, Link} from 'gatsby';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';
import Layout from '../components/layout';

const IndexPage = ({
  data: {
    allRecipesYaml: {
      recipies
    }
  }
}) => {
  return (
    <>
      <Layout>
        <div className="row">
          {recipies.map(({recipe}) => {
            return (
              <div key={recipe.id} className="col-xs-12 col-sm-6 col-md-3">
                <div className="card w-100">
                  <div className="card-block">
                    <Link to={recipe.fields.slug}>
                      <GatsbyImage className="card-img-top" image={getImage(recipe.image)} alt={recipe.title} style={{height: '200px'}} />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title"><Link to={recipe.fields.slug}>{recipe.title}</Link></h5>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="row">
          {/* <pre>{JSON.stringify(recipies, null, 2)}</pre> */}
        </div>
      </Layout>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allRecipesYaml(sort: { order: ASC, fields: [title] }) {
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

/* eslint-disable react/prop-types */
import * as React from 'react';
import {graphql, Link} from 'gatsby';
import {GatsbyImage} from 'gatsby-plugin-image';
import PlaceholderFood from '../images/placeholder_food.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const IndexPage = ({
  data: {
    allRecipesYaml: {
      recipies,
      allCuisines,
      allCourses
    }
  }
}) => {
  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Recipes</Link>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Courses</span>
              </h6>
              <ul className="nav flex-column mb-2">
                {allCourses.map(c => {
                  return (
                    <li key={c.fieldValue} className="nav-item">
                      <Link className="nav-link" to="/">
                        {c.fieldValue}
                        {' '}
                        <span className="badge  badge-pill badge-secondary">{c.totalCount}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Cuisines</span>
              </h6>
              <ul className="nav flex-column mb-2">
                {allCuisines.map(c => {
                  return (
                    <li key={c.fieldValue} className="nav-item">
                      <Link className="nav-link" to="/">
                        {c.fieldValue}
                        {' '}
                        <span className="badge badge-secondary">{c.totalCount}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
            <div className="row">
              {recipies.map(({recipe}) => {
                return (
                  <div key={recipe.id} className="col-xs-12 col-sm-6 col-md-3">
                    <div className="card w-100">
                      <div className="card-block">
                        {recipe.image ? <GatsbyImage className="card-img-top" image={recipe.image.childImageSharp.gatsbyImageData} alt={recipe.title} style={{height: '200px'}} /> : <PlaceholderFood className="card-img-top" style={{height: '200px'}} /> }
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
          </main>
        </div>
      </div>
    </>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    allRecipesYaml(sort: { order: DESC, fields: [title] }) {
      allCuisines: group(field: cuisine) {
        totalCount
        fieldValue
      }
      allCourses: group(field: course) {
        totalCount
        fieldValue
      }
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

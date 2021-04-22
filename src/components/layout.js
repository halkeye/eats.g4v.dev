import * as React from 'react';
import {graphql, Link, useStaticQuery} from 'gatsby';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = ({children, title}) => {
  const {allRecipesYaml: {allCuisines, allCourses}} = useStaticQuery(graphql`
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
    }
  }
  `);
  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Recipes
          {title ? ` - ${title}` : ''}
        </Link>
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
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Layout;

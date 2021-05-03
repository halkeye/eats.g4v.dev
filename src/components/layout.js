import * as React from 'react';
import {graphql, Link, useStaticQuery} from 'gatsby';
import PropTypes from 'prop-types';
import slugify from 'slugify';

import 'bootstrap/dist/css/bootstrap.min.css';

const footerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
};

const Lister = ({values, urlPrefix}) => {
  return (
    <ul className="nav nav-pills flex-column mb-2">
      {values.map(c => {
        return (
          <li key={c.fieldValue} className="nav-item">
            <Link className="nav-link" to={`${urlPrefix}${slugify(c.fieldValue)}`} activeClassName="active">
              {c.fieldValue}
              {' '}
              <span className="badge badge-pill badge-secondary">{c.totalCount}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

Lister.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      fieldValue: PropTypes.string.isRequired,
      totalCount: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  urlPrefix: PropTypes.string.isRequired
};

const Layout = ({children, title}) => {
  const {site: {buildTime, siteMetadata: {description}}, allRecipesYaml: {allCuisines, allCourses}} = useStaticQuery(graphql`
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
    site {
      buildTime
      siteMetadata {
        description
      }
    }
  }
  `);
  return (
    <>
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 d-print-none">
        <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
          Recipes
          {title ? ` - ${title}` : ''}
        </Link>
        <span className="navbar-text mr-2">
          {description}
        </span>
      </nav>
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar d-print-none">
            <div className="sidebar-sticky">
              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Courses</span>
              </h6>
              <Lister values={allCourses} urlPrefix={'/course/'} />

              <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Cuisines</span>
              </h6>
              <Lister values={allCuisines} urlPrefix={'/cuisine/'} />
            </div>
          </nav>

          <main role="main" className="col-md-9 ml-sm-auto pt-3 px-4">
            {children}
          </main>
        </div>
      </div>
      <footer className="d-print-none">
        <div className="text-center p-3" style={footerStyle}>
          Last Built:
          {' '}
          {buildTime}
        </div>
      </footer>
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

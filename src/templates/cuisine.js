/* eslint-disable react/prop-types */
import * as React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Recipies from '../components/recipies';
import {Seo} from '@pittica/gatsby-plugin-seo';

const CuisinePage = ({path, pageContext: {slug}, data: {allRecipesYaml: {recipies}}}) => {
  return (
    <>
      <Layout>
        <Seo
          title={`Cuisine ${slug}`}
          path={path}
        />
        <div className="row">
          <Recipies recipies={recipies} />
        </div>
      </Layout>
    </>
  );
};

export default CuisinePage;

export const pageQuery = graphql`
  query($slug: String!) {
    allRecipesYaml(sort: { order: ASC, fields: [title] }, filter: { cuisine: { eq: $slug }}) {
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

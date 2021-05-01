/* eslint-disable react/prop-types */
import * as React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/layout';
import Recipies from '../components/recipies';
import {Seo} from '@pittica/gatsby-plugin-seo';

const IndexPage = ({path, data: {allRecipesYaml: {recipies}}}) => {
  return (
    <>
      <Layout>
        <Seo />
        <div className="row">
          <Recipies recipies={recipies} />
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

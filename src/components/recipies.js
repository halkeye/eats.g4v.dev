import * as React from 'react';
import {Link} from 'gatsby';
import PropTypes from 'prop-types';
import {GatsbyImage, getImage} from 'gatsby-plugin-image';

const Recipes = ({recipies}) => recipies.map(({recipe}) => (
  <div key={recipe.id} className="col-xs-12 col-sm-6 col-md-3">
    <div className="card w-100">
      <Link to={recipe.fields.slug}>
        <div className="card-block">
          <GatsbyImage className="card-img-top" image={getImage(recipe.image)} alt={recipe.title} style={{height: '200px'}} />
          <div className="card-body">
            <h5 className="card-title"><Link to={recipe.fields.slug}>{recipe.title}</Link></h5>
          </div>
        </div>
      </Link>
    </div>
  </div>
));

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fields: PropTypes.shape({slug: PropTypes.string.isRequired}).isRequired,
    image: PropTypes.object
  })).isRequired
};
export default Recipes;

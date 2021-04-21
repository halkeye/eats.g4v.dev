const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const axios = require('axios');

async function main() {
  const recipes = await axios.get('https://eats.g4v.dev/api/v1/recipe/recipes/?limit=100&format=json');
  for (const recipe of recipes.data.results) {
    const slug = recipe.slug;
    const baseDir = path.join('src', 'recipes');

    if (recipe.photo) {
      recipe.image = '.' + path.sep + recipe.slug + path.parse(recipe.photo).ext;
      const photo = path.join(baseDir, recipe.image);
      if (!await fs.promises.stat(photo).catch(() => null)) {
        console.log('downloading', photo);
        const writer = fs.createWriteStream(photo)

        const response = await axios({
          url: recipe.photo,
          method: 'GET',
          responseType: 'stream'
        })

        response.data.pipe(writer)
        await new Promise((resolve, reject) => {
          writer.on('finish', resolve)
          writer.on('error', reject)
        })
      } else {
        console.log(photo, 'already exists');
      }
    }

    if (!recipe.ingredient_groups) {
      console.log(recipe);
    }
    recipe.ingredients = (recipe.ingredient_groups || []).map(ig => {
      return {
        items: ig.ingredients.map(i => {
          return {
            // remove the 0 width characters
            item: i.title.replace(/[\u200B-\u200D\uFEFF]/g, ''),
            amt: i.denominator == 1 ? `${i.numerator} ${i.measurement}` : `${i.numerator}/${i.denominator} ${i.measurement}`
          }
        })
      };
    }).filter(i => i.items.length);
    delete recipe.id;
    delete recipe.slug;
    delete recipe.photo;
    delete recipe.rating;
    delete recipe.subrecipes;
    delete recipe.pub_date;
    delete recipe.update_date;
    delete recipe.username;
    delete recipe.public;
    delete recipe.author;
    delete recipe.ingredient_groups;

    if (recipe.tags.length > 0) {
      recipe.tags = recipe.tags.map(t => t.title);
    } else {
      delete recipe.tags;
    }
    recipe.course = recipe.course.title;
    recipe.cuisine = recipe.cuisine.title;

    const filename = path.join(baseDir, slug + '.yaml');
    await fs.promises.writeFile(filename, yaml.safeDump(recipe));
  }
}
main();

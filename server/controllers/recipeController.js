require("../models/database");
const Category = require("../models/Category");
const Recipe = require("../models/Recipe");
/*
get /
homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    const categories = await Category.find({}).limit(limitNumber);
    const latest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    const thai = await Recipe.find({ category: "Thai" }).limit(limitNumber);
    const american = await Recipe.find({ category: "American" }).limit(
      limitNumber
    );
    const indian = await Recipe.find({ category: "Indian" }).limit(limitNumber);
    const food = { latest, thai, american, indian };

    res.render("index", { title: "cooking Blog-Home", categories, food });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
get /categories
categories
*/
exports.exploreCategories = async (req, res) => {
  try {
    const limitNumber = 20;
    const categories = await Category.find({}).limit(limitNumber);
    res.render("categories", { title: "cooking Blog-Categories", categories });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
get /categories/:id
categories by id
*/
exports.exploreCategoriesByID = async (req, res) => {
  try {
    let categoryId = req.params.id;
    const limitNumber = 20;
    const categoryById = await Recipe.find({ category: categoryId }).limit(
      limitNumber
    );
    res.render("categories", {
      title: "cooking Blog-Categories",
      categoryById,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
get /recipe/:id
Recipe
*/
exports.exploreRecipe = async (req, res) => {
  try {
    let recipeId = req.params.id;
    const recipe = await Recipe.findById(recipeId);
    res.render("recipe", { title: "cooking Blog-recipe", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
POST /search
search
*/

exports.searchRecipe = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    let recipe = await Recipe.find({
      $text: { $search: searchTerm, $diacriticSensitive: true },
    });
    res.render("search", { title: "cooking Blog-search", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/*
get /explore-latest
explore Latest
*/
exports.exploreLatest = async (req, res) => {
  try {
    const limitNumber = 20;
    const recipe = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber);
    res.render("explore-latest", { title: "cooking Blog-Explore Latest", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};




/*
get /explore-random
Explore Random as json
*/
exports.exploreRandom = async (req, res) => {
  try {
    let count=await Recipe.find().countDocuments();
    let random=Math.floor(Math.random()*count);
    let recipe=await Recipe.findOne().skip(random).exec();
    res.render("explore-random", { title: "cooking Blog-Explore ", recipe });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
}






/*
get /submitRecipe
submit Recipe
*/
exports.submitRecipe = async (req, res) => {

  res.render("submit-recipe", { title: "cooking Blog-submit Recipe " });

}



// async function insertDummyCategoryData(){
//     try {
//         await Category.insertMany([
//                   {
//                     "name": "Thai",
//                     "image": "thai-food.jpg"
//                   },
//                   {
//                     "name": "American",
//                     "image": "american-food.jpg"
//                   },
//                   {
//                     "name": "Chinese",
//                     "image": "chinese-food.jpg"
//                   },
//                   {
//                     "name": "Mexican",
//                     "image": "mexican-food.jpg"
//                   },
//                   {
//                     "name": "Indian",
//                     "image": "indian-food.jpg"
//                   },
//                   {
//                     "name": "Spanish",
//                     "image": "spanish-food.jpg"
//                   }
//                 ]);

//     } catch (error) {
//         console.log('err',+error)
//     }
// }
// insertDummyCategoryData();

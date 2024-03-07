require('../models/database');
const Category = require('../models/Category');
const Recipe=require('../models/Recipe');
/*
get /
homepage
 */
exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);

        const latest=await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const thai=await  Recipe.find({category:"Thai"}).limit(limitNumber);
        const american=await  Recipe.find({category:"American"}).limit(limitNumber);
        const chinese=await  Recipe.find({category:"Chinese"}).limit(limitNumber);
        const indian=await  Recipe.find({category:"Indian"}).limit(limitNumber);
        const food={latest,thai,american,chinese,indian }
        
        res.render('index', { title: 'cooking Blog-Home', categories,food});
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}








/*
get /categories
categories
*/
exports.exploreCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', { title: 'cooking Blog-Categories', categories });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
}





/*
get /recipe/:id
Recipe
*/
exports.exploreRecipe = async (req, res) => {
    try {
        let recipeId=req.params.id;
        const recipe=await Recipe.findById(recipeId)
        res.render('recipe', { title: 'cooking Blog', recipe });
    } catch (error) {
        res.status(500).send({ message: error.message || "Error Occured" });
    }
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


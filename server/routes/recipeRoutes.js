const express=require('express');
const router=express.Router();
const recipeController=require("../controllers/recipeController.js");

/*
app routes
*/
router.get('/',recipeController.homepage);
router.get('/categories',recipeController.exploreCategories);
router.get('/recipe/:id',recipeController.exploreRecipe);

module.exports=router;
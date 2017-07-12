var express = require('express');
var router = express.Router();

var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Karianu' });
});

router.get('/api/ingredients', db.getAllIngredients);

router.post('/api/ingredients', db.createIngredient);
router.put('/api/ingredients/:id', db.updateIngredient);
router.delete('/api/ingredients/:id', db.removeIngredient);

router.get('/api/recipes', db.getAllRecipes);
router.get('/api/recipes/:id', db.getRecipe);
router.post('/api/recipes_by_ingredients', db.getRecipeByIngredients);

router.post('/api/recipes', db.createRecipe);
router.put('/api/recipes/:id', db.updateRecipe);
router.delete('/api/recipes/:id', db.removeRecipe);

router.post('/api/add_recipe_ingredients', db.addRecipeIngredients);

module.exports = router;
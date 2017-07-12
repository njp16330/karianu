var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'karianu',
    user: 'postgres',
    password: 'sql@dm1n'
});

// add query functions

function getAllIngredients(req, res, next) {
	db.any('select * from ingredients').then(function (data) {
		res.status(200).json({
			status: 'success',
			data: data,
			message: 'Retrieved ALL Ingredients'
		});
	}).catch(function (err) {
		return next(err);
	});
}

function createIngredient(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into ingredients(name, description, category)' +
      'values(${name}, ${description}, ${category})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one ingredient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateIngredient(req, res, next) {
  db.none('update ingredients set name=$1, description=$2, category=$3 where id=$4',
    [req.body.name, req.body.description, req.body.category, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated ingredient'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeIngredient(req, res, next) {
  
  db.result('delete from ingredients where id = $1', parseInt(req.params.id))
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} ingredient`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


function getAllRecipes(req, res, next){
  db.any('select * from recipes').then(function (data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL Recipes'
    });
  }).catch(function (err) {
    return next(err);
  });
}
function getRecipe(req, res, next){
  db.any('select * from recipes where id=$1',[parseInt(req.params.id)]).then(function (data) {
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved one Recipe'
    });
  }).catch(function (err) {
    return next(err);
  });
}
function getRecipeByIngredients(req, res, next){
  db.any('select * from recipes where id in (select recipe_id from recipe_ingredients where ingredient_id in ($1))', 
    req.body.ingredient_ids.join(',')).then(function(data){
    res.status(200).json({
      status: 'success',
      data: data,
      message: 'Retrieved Recipes by Ingredients'
    })
  }).catch(function(err){
    return next(err);
  });
}

function createRecipe(req, res, next){
  db.none('insert into recipes (name, description, category) values (${name}, ${description}, ${category})', 
    req.body).then(function(){
    res.status(200).json({
      status: 'success',
      message: 'Inserted one Recipe'
    });
  }).catch(function(err){
    return next(err);
  });
}
function updateRecipe(req, res, next){
  db.none('update recipes set name=${name}, description=${description}, category=${category} where id=${id}', 
    req.body).then(function(){
    res.status(200).json({
      status: 'success',
      message: 'Updated one Recipe'
    });
  }).catch(function(err){
    return next(err);
  });
}
function removeRecipe(req, res, next){
  db.result('delete from recipes where id = $1', parseInt(req.params.id))
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} recipe`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

var r_i_columns_set = new pgp.helpers.ColumnSet(['recipe_id', 'ingredient_id'], {table: 'recipe_ingredients'});

function addRecipeIngredients(req, res, next){
  req.none(pgp.helpers.insert(req.body.ingredient_ids.map(function(v){return {ingredient_id: v, recipe_id: req.body.recipe_id};}), 
    r_i_columns_set)).then(function(){
    res.status(200).json({
      status: 'success',
      message: 'Added Ingredients for a Recipe'
    });
  }).catch(function(err){
    return next(err);
  });
}
// query functions end

module.exports = {
	getAllIngredients: getAllIngredients,
	createIngredient: createIngredient,
	updateIngredient: updateIngredient,
	removeIngredient: removeIngredient,

  getAllRecipes: getAllRecipes,
  getRecipe: getRecipe,
  getRecipeByIngredients: getRecipeByIngredients,
  createRecipe: createRecipe,
  updateRecipe: updateRecipe,
  removeRecipe: removeRecipe,

  addRecipeIngredients: addRecipeIngredients

  //create api to search recipes and ingredients
};
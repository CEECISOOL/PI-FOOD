const { Router } = require('express');
const recipes = require('./recipes');
const diets = require('./diets');
const recipe = require('./recipe');
const router = Router();


router.use('/recipes', recipes);
router.use('/types', diets);
router.use('/recipe', recipe);

module.exports = router;

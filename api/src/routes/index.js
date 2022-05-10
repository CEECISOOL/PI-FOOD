const { Router } = require('express');
// Importar todos los routers;
const recipes = require('./recipes');
const diets = require('./diets');


const router = Router();

// Configurar los routers
router.use('/recipes', recipes);
router.use('/types', diets);


module.exports = router;

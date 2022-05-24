const { Router } = require('express');
const { Recipe, Diet } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    const { title, summary, spoonacularScore, healthScore, analyzedInstructions, image, createdInDb, diets } = req.body;

    let recipeCreated = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        image,
        createdInDb,
    });

    let dietDb = await Diet.findAll({
        where: {
            name: diets,
        }
    });

    await recipeCreated.addDiet(dietDb);
    res.send('Receta cargada con exito');
});

module.exports = router;


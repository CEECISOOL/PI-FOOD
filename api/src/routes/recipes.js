const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env;
const router = Router();
const infoTotal = require('../../info.json');


const getAllRecipes = async () => {
    const apiUrl = infoTotal
    //const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    const apiInfo = await apiUrl.results.map(el => {  //le saque el data.results
        return {
            id: el.id,
            title: el.title,
            image: el.image,
            spoonacularScore: el.spoonacularScore,
            healthScore: el.healthScore,
            summary: el.summary,
            analyzedInstructions: el.analyzedInstructions?.map(e => e.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })),
            diets: el.diets,
            dishTypes: el.dishTypes
        }
    });
    const dbInfo = await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    const allRecipes = [...apiInfo, ...dbInfo];
    return allRecipes;
};

router.get('/', async (req, res) => {
    const name = req.query.name;
    const allRecipes = await getAllRecipes();
    if (name) {
        let recipeNames = allRecipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
        recipeNames.length ?
            res.send(recipeNames) :
            res.send("not found")
    }
    else {
        res.status(200).send(allRecipes)
    }
});

router.get('/:idR', async (req, res) => {
    const { idR } = req.params;
    const allInfo = await getAllRecipes();
    try {
        allInfo.forEach(el => {
            if (el.id == idR) {
                res.json({
                    id: el.id,
                    title: el.title,
                    image: el.image,
                    spoonacularScore: el.spoonacularScore,
                    healthScore: el.healthScore,
                    summary: el.summary,
                    analyzedInstructions: el.analyzedInstructions,
                    diets: el.diets,
                    dishTypes: el.dishTypes
                });
            };
        });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
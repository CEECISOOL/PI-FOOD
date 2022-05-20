const { Router } = require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db');
const { API_KEY } = process.env

const router = Router();


const getApiInfo = async () => {
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map(el => {
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
    return apiInfo;
}

const getDbInfo = async () => {
    const dbInfo = Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })
    return dbInfo;
}

const getAllRecipes = async () => {
    const apiInfo = await getApiInfo(),
        dbInfo = await getDbInfo(),
        allInfo = apiInfo.concat(dbInfo);
    return allInfo;
}



router.get('/', async (req, res) => {
    const name = req.query.name
    const allRecipes = await getAllRecipes();
    if (name) {
        let recipeNames = allRecipes.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));

        recipeNames.length ?
            res.send(recipeNames) :
            res.send("Recipes not found")
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
                })
            }
        })
    } catch(error){
       console.log(error)
    }
})



/*router.get('/:idB', async (req, res) => {
    const { idB } = req.params
    try {
        const recipeId = await axios.get(`https://api.spoonacular.com/recipes/${idB}/information?apiKey=${API_KEY}`);          
        const apiInfoId = recipeId.data.id;
        const apiInfoTitle =recipeId.data.title
        const apiInfoImage = recipeId.data.image
        const apiInfoScore = recipeId.data.spoonacularScore
        const apiInfoHealthScore = recipeId.data.healthScore
        const apiInfoSummary = recipeId.data.summary
        const apiInfoInstructions = recipeId.data.analyzedInstructions
        const apiInfoDiets = recipeId.data.diets 
        const apiInfoDishTypes = recipeId.data.dishTypes

        const allApiId = {
            id: apiInfoId,
            title: apiInfoTitle,
            image: apiInfoImage,
            spoonacularScore: apiInfoScore,
            healthScore: apiInfoHealthScore,
            summary: apiInfoSummary,
            analyzedInstructions: apiInfoInstructions,
            diets: apiInfoDiets,
            dishTypes: apiInfoDishTypes
        }

        allApiId ?
            res.status(200).json(allApiId) :
            res.status(404).send('No existe receta con ese Id')
    } catch (error) {
        const recipeId = await Recipe.findByPk(idB, {
            include: {
                model: Diet,
                through: { attributes: [] },
                attributes: ["name"],
                exclude: ["recipe_diets"]
            }
        })
        recipeId ?
            res.status(200).json(recipeId) :
            res.status(404).send('No existe receta con ese Id')
    }
});*/

router.post('/', async (req, res) => {
    const { title, summary, spoonacularScore, healthScore, analyzedInstructions, image, createdInDb, diets } = req.body

    let recipeCreated = await Recipe.create({
        title,
        summary,
        spoonacularScore,
        healthScore,
        analyzedInstructions,
        image,
        createdInDb,
    })

    let dietDb = await Diet.findAll({
        where: {
            name: diets,
        }
    });

    await recipeCreated.addDiet(dietDb)
    res.send('Receta cargada con exito')
});



module.exports = router;